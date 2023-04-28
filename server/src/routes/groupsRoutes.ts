import { ColorIds } from "../common/colors";

import data from "../db";
const express = require("express");
const groupsData = data.groups;
const quicknotesData = data.quicknotes;
const marknotesData = data.marknotes;
const checklistsData = data.checklists;
const router = express.Router();

/**
 * [GET /user/:userId/groups]
 */
router.get("/user/:userId/groups", async (req: any, res: any) => {
  const userId = req.params.userId;
  try {
    let groups = await groupsData.getAllGroups(userId.trim());
    return res.status(200).json(groups);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Failed to fetch groups from database." });
  }
});

/**
 * [GET /user/:userId/groups/:id]
 */
router.get("/user/:userId/groups/:id", async (req: any, res: any) => {
  let id = req.params.id;
  const userId = req.params.userId;
  try {
    let group = await groupsData.getGroupById(id.trim(), userId.trim());
    return res.status(200).json(group);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Failed to fetch groups from database." });
  }
});

/**
 * [POST /user/:userId/groups]
 */
router.post("/user/:userId/groups", async (req: any, res: any) => {
  const userId = req.params.userId;
  const title = req.body.title;
  const color = req.body.color;

  if (!req.body.title) {
    req.body.title = "";
  }
  if (!req.body.color) {
    req.body.color = "grey";
  }
  if (!ColorIds.includes(req.body.color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  try {
    let new_group = await groupsData.createGroup(userId.trim(), title, color);
    return res.status(200).json(new_group);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to create new group.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /user/:userId/groups/:id]
 */
router.patch("/user/:userId/groups/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const title = req.body.title;
  const color = req.body.color;
  const favorited = req.body.favorited;
  const lastModified = req.body.lastModified;

  if (!ColorIds.includes(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  // Check if group exists
  let group;
  try {
    group = await groupsData.getGroupById(id.trim(), userId.trim());
    if (!group) {
      return res.status(400).json({
        error: `Group with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
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
    let updated_group = await groupsData.updateGroupById(
      id.trim(),
      userId.trim(),
      group
    );
    return res.status(200).json(updated_group);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to update group.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /user/:userId/groups/:id/quicknotes/:noteId]
 */
router.patch(
  "/user/:userId/groups/:id/quicknotes/:noteId",
  async (req: any, res: any) => {
    const id = req.params.id;
    const noteId = req.params.noteId;
    const userId = req.params.userId;
    // Check if group exists
    let group;
    try {
      group = await groupsData.getGroupById(id.trim(), userId.trim());
      if (!group) {
        return res.status(400).json({
          error: `Group with id ${id.trim()} was not found.`,
        });
      }
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to fetch group.",
        message: e.toString(),
      });
    }

    // If note is in group, remove the group, otherwise, add it
    let updatedGroup = null,
      updatedNote = null;
    if (group.quicknotes.includes(noteId.trim())) {
      try {
        updatedGroup = await groupsData.removeFromGroup(
          id.trim(),
          noteId.trim(),
          "quicknote",
          userId.trim()
        );
        updatedNote = await quicknotesData.removeGroupFromQuicknote(
          noteId.trim(),
          id.trim(),
          userId.trim()
        );
      } catch (e: any) {
        console.log(e);
        return res.status(500).json({
          error: "Failed to remove quicknote to group.",
          message: e.toString(),
        });
      }
    } else {
      try {
        updatedGroup = await groupsData.addToGroup(
          id.trim(),
          noteId.trim(),
          "quicknote",
          userId.trim()
        );
        updatedNote = await quicknotesData.addGroupToQuicknote(
          noteId.trim(),
          id.trim(),
          userId.trim()
        );
      } catch (e: any) {
        console.log(e);
        return res.status(500).json({
          error: "Failed to add quicknote to group.",
          message: e.toString(),
        });
      }
    }
    return res
      .status(200)
      .json({ updatedGroup: updatedGroup, updatedNote: updatedNote });
  }
);

/**
 * [PATCH /user/:userId/groups/:id/marknotes/:noteId]
 */
router.patch("/user/:userId/groups/:id/marknotes/:noteId", async (req: any, res: any) => {
  const id = req.params.id;
  const noteId = req.params.noteId;
  const userId = req.params.userId;
  // Check if group exists
  let group;
  try {
    group = await groupsData.getGroupById(id.trim(), userId.trim());
    if (!group) {
      return res.status(400).json({
        error: `Group with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch group.",
      message: e.toString(),
    });
  }

  // If note is in group, remove the group, otherwise, add it
  let updatedGroup = null,
    updatedNote = null;
  if (group.marknotes.includes(noteId.trim())) {
    try {
      updatedGroup = await groupsData.removeFromGroup(
        id.trim(),
        noteId.trim(),
        "marknote",
        userId.trim()
      );
      updatedNote = await marknotesData.removeGroupFromMarknote(
        noteId,
        id.trim(),
        userId.trim()
      );
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to remove marknote from group.",
        message: e.toString(),
      });
    }
  } else {
    try {
      updatedGroup = await groupsData.addToGroup(
        id.trim(),
        noteId.trim(),
        "marknote",
        userId.trim()
      );
      updatedNote = await marknotesData.addGroupToMarknote(
        noteId,
        id.trim(),
        userId.trim()
      );
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to add marknote from group.",
        message: e.toString(),
      });
    }
  }
  return res
    .status(200)
    .json({ updatedGroup: updatedGroup, updatedNote: updatedNote });
});

/**
 * [PATCH /user/:userId/groups/:id/checklists/:noteId]
 */
router.patch("/user/:userId/groups/:id/checklists/:noteId", async (req: any, res: any) => {
  const id = req.params.id;
  const noteId = req.params.noteId;
  const userId = req.params.userId;
  // Check if group exists
  let group;
  try {
    group = await groupsData.getGroupById(id.trim(), userId.trim());
    if (!group) {
      return res.status(400).json({
        error: `Group with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch group.",
      message: e.toString(),
    });
  }

  // If note is in group, remove the group, otherwise, add it
  let updatedGroup = null,
    updatedNote = null;
  if (group.checklists.includes(noteId.trim())) {
    try {
      updatedGroup = await groupsData.removeFromGroup(
        id.trim(),
        noteId.trim(),
        "checklist",
        userId.trim()
      );
      updatedNote = await checklistsData.removeGroupFromChecklist(
        noteId,
        id.trim(),
        userId.trim()
      );
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to remove checklist from group.",
        message: e.toString(),
      });
    }
  } else {
    try {
      updatedGroup = await groupsData.addToGroup(
        id.trim(),
        noteId.trim(),
        "checklist",
        userId.trim()
      );
      updatedNote = await checklistsData.addGroupToChecklist(
        noteId,
        id.trim(),
        userId.trim()
      );
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to add checklist from group.",
        message: e.toString(),
      });
    }
  }
  return res
    .status(200)
    .json({ updatedGroup: updatedGroup, updatedNote: updatedNote });
});

/**
 * [DELETE /user/:userId/groups/:id]
 */
router.delete("/user/:userId/groups/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;

  // Check if group exists
  let group;
  try {
    group = await groupsData.getGroupById(id.trim(), userId.trim());
    if (!group) {
      return res.status(400).json({
        error: `Group with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch group.",
      message: e.toString(),
    });
  }

  // Delete the group
  try {
    let delete_status = await groupsData.deleteGroupById(
      id.trim(),
      userId.trim()
    );
    return res.status(200).json({ success: delete_status });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to delete group.",
      message: e.toString(),
    });
  }
});

module.exports = router;
