import { ColorIds } from "../common/colors";

import data from "../db";
const quicknotesData = data.quicknotes;
const express = require("express");
const router = express.Router();

/**
 * [GET /user/:userId/quicknotes]
 */
router.get("/user/:userId/quicknotes", async (req: any, res: any) => {
  const userId = req.params.userId;
  try {
    let quicknotes = await quicknotesData.getAllQuicknotes(userId.trim());
    return res.status(200).json(quicknotes);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Failed to fetch quicknotes from database." });
  }
});

/**
 * [GET /user/:userId/quicknotes/:id]
 */
router.get("/user/:userId/quicknotes/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;
  try {
    let quicknote = await quicknotesData.getQuicknoteById(
      id.trim(),
      userId.trim()
    );
    return res.status(200).json(quicknote);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Failed to fetch quicknotes from database." });
  }
});

/**
 * [POST /user/:userId/quicknotes]
 */
router.post("/user/:userId/quicknotes", async (req: any, res: any) => {
  const userId = req.params.userId;
  let title = req.body.title;
  let color = req.body.color;
  let body = req.body.body;

  if (!title) {
    title = "";
  }
  if (!color) {
    color = "grey";
  }
  if (!body) {
    body = "";
  }
  if (title.length > 30) {
    return res.status(400).json({
      error: "Title length cannot exceed 30 characters",
    });
  }
  if (body.length > 300) {
    return res.status(400).json({
      error: "Body length cannot exceed 300 characters",
    });
  }
  if (!ColorIds.includes(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  try {
    let new_quicknote = await quicknotesData.createQuicknote(
      userId.trim(),
      title,
      color,
      body
    );
    return res.status(200).json(new_quicknote);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to create new quicknote.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /user/:userId/quicknotes/:id]
 */
router.patch("/user/:userId/quicknotes/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const title = req.body.title;
  const color = req.body.color;
  const favorited = req.body.favorited;
  const body = req.body.body;

  if (title && title.length > 30) {
    return res.status(400).json({
      error: "Title length cannot exceed 30 characters",
    });
  }
  if (body && body.length > 300) {
    return res.status(400).json({
      error: "Body length cannot exceed 300 characters",
    });
  }
  if (color && !ColorIds.includes(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  // Check if quicknote exists
  let quicknote;
  try {
    quicknote = await quicknotesData.getQuicknoteById(id.trim(), userId.trim());
    if (!quicknote) {
      return res.status(400).json({
        error: `Quicknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch quicknote.",
      message: e.toString(),
    });
  }

  if (title != null) {
    quicknote.title = title;
  }
  if (color != null) {
    quicknote.color = color;
  }
  if (body != null) {
    quicknote.body = body;
  }
  if (favorited != null) {
    quicknote.favorited = favorited;
  }
  quicknote.lastModified = Date.now();

  // Update the quicknote
  try {
    let updated_quicknote = await quicknotesData.updateQuicknoteById(
      id.trim(),
      userId.trim(),
      quicknote
    );
    return res.status(200).json(updated_quicknote);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to update quicknote.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /user/:userId/quicknotes/:id/:groupId]
 */
router.patch("/user/:userId/quicknotes/:id/:groupId", async (req: any, res: any) => {
  const id = req.params.id;
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  // Check if quicknote exists
  let quicknote;
  try {
    quicknote = await quicknotesData.getQuicknoteById(id.trim(), userId.trim());
    if (!quicknote) {
      return res.status(400).json({
        error: `Quicknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch quicknote.",
      message: e.toString(),
    });
  }

  // If group is in quicknote, remove the group, otherwise, add it
  if (quicknote.groups.includes(groupId.trim())) {
    try {
      quicknote = await quicknotesData.removeGroupFromQuicknote(
        id.trim(),
        groupId.trim(),
        userId.trim()
      );
      return res.status(200).json(quicknote);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to remove group from quicknote.",
        message: e.toString(),
      });
    }
  } else {
    try {
      quicknote = await quicknotesData.addGroupToQuicknote(
        id.trim(),
        groupId.trim(),
        userId.trim()
      );
      return res.status(200).json(quicknote);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to add group to quicknote.",
        message: e.toString(),
      });
    }
  }
});

/**
 * [DELETE /user/:userId/quicknotes/:id/]
 */
router.delete("/user/:userId/quicknotes/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;
  // Check if quicknote exists
  let quicknote;
  try {
    quicknote = await quicknotesData.getQuicknoteById(id.trim(), userId.trim());
    if (!quicknote) {
      return res.status(400).json({
        error: `Quicknote with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch quicknote.",
      message: e.toString(),
    });
  }

  // Delete the quicknote
  try {
    let delete_status = await quicknotesData.deleteQuicknoteById(
      id.trim(),
      userId.trim()
    );
    return res.status(200).json({ success: delete_status });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to delete quicknote.",
      message: e.toString(),
    });
  }
});

module.exports = router;
