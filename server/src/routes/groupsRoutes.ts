import { isHex } from "../common/regex";
const data = require("../db");
const groupsData = data.groups;
const quicknotesData = data.quicknotes;
const marknotesData = data.marknotes;
const express = require("express");
const router = express.Router();

/**
 * [GET /groups]
 */
router.get("/", async (req: any, res: any) => {
  try {
    let groups = await groupsData.getAllGroups();
    return res.status(200).json(groups);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to fetch groups from database." });
  }
});

/**
 * [GET /groups/:id]
 */
router.get("/:id", async (req: any, res: any) => {
  let id = req.params.id;
  try {
    let group = await groupsData.getGroupById(id.trim());
    return res.status(200).json(group);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to fetch groups from database." });
  }
});

/**
 * [POST /groups]
 */
router.post("/", async (req: any, res: any) => {
  const title = req.body.title;
  const color = req.body.color;

  if (!req.body.title) {
    req.body.title = "";
  }
  if (!req.body.color) {
    req.body.color = "#828282";
  }
  if (!isHex(req.body.color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  try {
    let new_group = await groupsData.createGroup(title, color);
    return res.status(200).json(new_group);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to create new group.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /groups/:id]
 */
router.patch("/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const title = req.body.title;
  const color = req.body.color;
  const favorited = req.body.favorited;
  const lastModified = req.body.lastModified;

  if (!isHex(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  // Check if group exists
  let group;
  try {
    group = await groupsData.getGroupById(id.trim());
    if (!group) {
      return res.status(400).json({
        error: `Group with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch group.",
      message: e.toString(),
    });
  }

  if (title != null) {
    group.title = title;
  }
  if (color != null) {
    group.color = color;
  }
  if (favorited !== null) {
    group.favorited = favorited;
  }
  if (lastModified != null) {
    group.lastModified = lastModified;
  }

  // Update the group
  try {
    let updated_group = await groupsData.updateGroupById(id.trim(), group);
    return res.status(200).json(updated_group);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to update group.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /groups/:id/quicknotes/:noteId]
 */
router.patch("/:id/quicknotes/:noteId", async (req: any, res: any) => {
  const id = req.params.id;
  const noteId = req.params.noteId;
  // Check if group exists
  let group;
  try {
    group = await groupsData.getGroupById(id.trim());
    if (!group) {
      return res.status(400).json({
        error: `Group with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch group.",
      message: e.toString(),
    });
  }

  // If note is in group, remove the group, otherwise, add it
  let updatedGroup = null;
  if (group.quicknotes.includes(noteId.trim())) {
    try {
      await quicknotesData.removeGroupFromQuicknote(noteId, id.trim());
      updatedGroup = await groupsData.removeFromGroup(
        id.trim(),
        noteId.trim(),
        "quicknote"
      );
      return res.status(200).json(updatedGroup);
    } catch (e: any) {
      return res.status(500).json({
        error: "Failed to remove quicknote to group.",
        message: e.toString(),
      });
    }
  } else {
    try {
      await quicknotesData.addGroupToQuicknote(noteId, id.trim());
      updatedGroup = await groupsData.addToGroup(
        id.trim(),
        noteId.trim(),
        "quicknote"
      );
      return res.status(200).json(updatedGroup);
    } catch (e: any) {
      return res.status(500).json({
        error: "Failed to add quicknote to group.",
        message: e.toString(),
      });
    }
  }
});

/**
 * [PATCH /groups/:id/marknotes/:noteId]
 */
router.patch("/:id/marknotes/:noteId", async (req: any, res: any) => {
  const id = req.params.id;
  const noteId = req.params.noteId;
  // Check if group exists
  let group;
  try {
    group = await groupsData.getGroupById(id.trim());
    if (!group) {
      return res.status(400).json({
        error: `Group with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch group.",
      message: e.toString(),
    });
  }

  // If note is in group, remove the group, otherwise, add it
  let updatedGroup = null;
  if (group.marknotes.includes(noteId.trim())) {
    try {
      await marknotesData.removeGroupFromMarknote(noteId, id.trim());
      updatedGroup = await groupsData.removeFromGroup(
        id.trim(),
        noteId.trim(),
        "marknote"
      );
      return res.status(200).json(updatedGroup);
    } catch (e: any) {
      return res.status(500).json({
        error: "Failed to remove marknote from group.",
        message: e.toString(),
      });
    }
  } else {
    try {
      await marknotesData.addGroupToMarknote(noteId, id.trim());
      updatedGroup = await groupsData.addToGroup(
        id.trim(),
        noteId.trim(),
        "marknote"
      );
      return res.status(200).json(updatedGroup);
    } catch (e: any) {
      return res.status(500).json({
        error: "Failed to add marknote from group.",
        message: e.toString(),
      });
    }
  }
});

/**
 * [DELETE /groups/:id/]
 */
router.delete("/:id", async (req: any, res: any) => {
  const id = req.params.id;

  // Check if group exists
  let group;
  try {
    group = await groupsData.getGroupById(id.trim());
    if (!group) {
      return res.status(400).json({
        error: `Group with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch group.",
      message: e.toString(),
    });
  }

  // Delete the group
  try {
    let delete_status = await groupsData.deleteGroupById(id.trim());
    return res.status(200).json({ success: delete_status });
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to delete group.",
      message: e.toString(),
    });
  }
});

module.exports = router;
