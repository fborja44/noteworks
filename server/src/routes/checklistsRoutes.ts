import { ColorIds } from "../common/colors";

const data = require("../db");
const checklistsData = data.checklists;
const express = require("express");
const router = express.Router();

/**
 * [GET /checklists]
 */
router.get("/", async (req: any, res: any) => {
  try {
    let checklists = await checklistsData.getAllChecklists();
    return res.status(200).json(checklists);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to fetch checklists from database." });
  }
});

/**
 * [GET /checklists/:id]
 */
router.get("/:id", async (req: any, res: any) => {
  const id = req.params.id;
  try {
    let checklist = await checklistsData.getChecklistById(id.trim());
    return res.status(200).json(checklist);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to fetch checklists from database." });
  }
});

/**
 * [POST /checklists]
 */
router.post("/", async (req: any, res: any) => {
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
    let new_checklist = await checklistsData.createChecklist(
      title,
      color,
      body
    );
    return res.status(200).json(new_checklist);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to create new checklist.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /checklists/:id]
 */
router.patch("/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const title = req.body.title;
  const color = req.body.color;
  const favorited = req.body.favorited;

  if (title && title.length > 30) {
    return res.status(400).json({
      error: "Title length cannot exceed 30 characters",
    });
  }
  if (color && !ColorIds.includes(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  // Check if checklist exists
  let checklist;
  try {
    checklist = await checklistsData.getChecklistById(id.trim());
    if (!checklist) {
      return res.status(400).json({
        error: `Checklist with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch checklist.",
      message: e.toString(),
    });
  }

  if (title != null) {
    checklist.title = title;
  }
  if (color != null) {
    checklist.color = color;
  }
  if (favorited != null) {
    checklist.favorited = favorited;
  }
  checklist.lastModified = Date.now();

  // Update the checklist
  try {
    let updated_checklist = await checklistsData.updateChecklistById(
      id.trim(),
      checklist
    );
    return res.status(200).json(updated_checklist);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to update checklist.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /checklists/:id/:groupId]
 */
router.patch("/:id/:groupId", async (req: any, res: any) => {
  const id = req.params.id;
  const groupId = req.params.groupId;

  // Check if checklist exists
  let checklist;
  try {
    checklist = await checklistsData.getChecklistById(id.trim());
    if (!checklist) {
      return res.status(400).json({
        error: `Checklist with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch checklist.",
      message: e.toString(),
    });
  }

  // If group is in checklist, remove the group, otherwise, add it
  if (checklist.groups.includes(groupId.trim())) {
    try {
      checklist = await checklistsData.removeGroupFromChecklist(
        id.trim(),
        groupId.trim()
      );
    } catch (e: any) {
      return res.status(500).json({
        error: "Failed to remove group from checklist.",
        message: e.toString(),
      });
    }
  } else {
    try {
      checklist = await checklistsData.addGroupToChecklist(
        id.trim(),
        groupId.trim()
      );
    } catch (e: any) {
      return res.status(500).json({
        error: "Failed to add group to checklist.",
        message: e.toString(),
      });
    }
  }
});

/**
 * [DELETE /checklists/:id/]
 */
router.delete("/:id", async (req: any, res: any) => {
  const id = req.params.id;

  // Check if checklist exists
  let checklist;
  try {
    checklist = await checklistsData.getChecklistById(id.trim());
    if (!checklist) {
      return res.status(400).json({
        error: `Checklist with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch checklist.",
      message: e.toString(),
    });
  }

  // Delete the checklist
  try {
    let delete_status = await checklistsData.deleteChecklistById(id.trim());
    return res.status(200).json({ success: delete_status });
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to delete checklist.",
      message: e.toString(),
    });
  }
});

module.exports = router;
