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
      .json({ error: "Failed to fetch checklist from database." });
  }
});

/**
 * [POST /checklists]
 */
router.post("/", async (req: any, res: any) => {
  let title = req.body.title;
  let color = req.body.color;

  if (!title) {
    title = "";
  }
  if (!color) {
    color = "grey";
  }
  if (title.length > 30) {
    return res.status(400).json({
      error: "Title length cannot exceed 30 characters",
    });
  }
  if (!ColorIds.includes(color)) {
    return res.status(400).json({
      error: `'${color}' is not a valid hex code`,
    });
  }

  try {
    let new_checklist = await checklistsData.createChecklist(title, color);
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
  const items = req.body.items;

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
  if (items && Array.isArray(items)) {
    // Check all items to see if valid
    for (const item of items) {
      if (!item._id || item.checked === undefined || item.content === undefined)
        return res.status(400).json({
          error: `Checklist item {'item_id': '${item._id}'} is missing required fields.`,
        });
      if (typeof item.checked !== "boolean")
        return res.status(400).json({
          error: `Checklist item {'item_id': '${item._id}'} checked status must be a boolean.`,
        });
    }
  } else {
    return res.status(400).json({
      error: `Items field is not a valid array.`,
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
  if (items != null) {
    checklist.items = items;
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
      return res.status(200).json(checklist);
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
      return res.status(200).json(checklist);
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

/**
 * [GET /checklists/:id/item/:item_id]
 */
router.get("/:id/item/:item_id", async (req: any, res: any) => {
  const id = req.params.id;
  const item_id = req.params.item_id;

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

  // Fetch item from checklist
  try {
    let checklistItem = await checklistsData.getChecklistItemById(
      id.trim(),
      item_id.trim()
    );
    return res.status(200).json(checklistItem);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch checklist item from database.",
      message: e.toString(),
    });
  }
});

/**
 * [POST /checklists/:id/item]
 */
router.post("/:id/item", async (req: any, res: any) => {
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

  checklist.lastModified = Date.now();

  // Add item to checklist
  try {
    let updated_checklist = await checklistsData.addChecklistItem(
      id.trim(),
      ""
    );
    return res.status(200).json(updated_checklist);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to add new item to checklist.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /checklists/:id/item/:item_id]
 */
router.patch("/:id/item/:item_id", async (req: any, res: any) => {
  const id = req.params.id;
  const item_id = req.params.item_id;
  const content = req.body.content;
  const checked = req.body.checked;

  if (typeof checked !== "boolean" && typeof checked !== "undefined") {
    return res.status(400).json({
      error: `Item status '${checked}' is not a valid boolean.`,
    });
  }

  // Check if checklist item exists
  let checklistItem;
  try {
    checklistItem = await checklistsData.getChecklistItemById(
      id.trim(),
      item_id.trim()
    );
    if (!checklistItem) {
      return res.status(400).json({
        error: `Checklist item with id ${item_id.trim()} in checklist with id ${id} was not found.`,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch checklist item from database.",
      message: e.toString(),
    });
  }

  if (content != null) {
    checklistItem.content = content;
  }
  if (checked != null) {
    checklistItem.checked = checked;
  }

  // Update the checklist
  try {
    let updated_checklist = await checklistsData.updateChecklistItemById(
      id.trim(),
      checklistItem
    );
    return res.status(200).json(updated_checklist);
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to update checklist item.",
      message: e.toString(),
    });
  }
});

/**
 * [DELETE /checklists/:id/item/:item_id]
 */
router.delete("/:id/item/:item_id", async (req: any, res: any) => {
  const id = req.params.id;
  const item_id = req.params.item_id;

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

  checklist.lastModified = Date.now();

  // Delete item in checklist
  try {
    let delete_status = await checklistsData.removeChecklistItem(
      id.trim(),
      item_id.trim()
    );
    return res.status(200).json({ success: delete_status });
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to remove item from checklist.",
      message: e.toString(),
    });
  }
});

module.exports = router;
