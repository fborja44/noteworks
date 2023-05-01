import { ColorIds } from "../common/colors";

import data from "../db";
const express = require("express");
const checklistsData = data.checklists;
const router = express.Router();

/**
 * [GET /user/:userId/checklists/:userId]
 */
router.get("/user/:userId/checklists", async (req: any, res: any) => {
  const userId = req.params.userId;
  try {
    let checklists = await checklistsData.getAllChecklists(userId.trim());
    return res.status(200).json(checklists);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to fetch checklists from database." });
  }
});

/**
 * [GET /user/:userId/checklists/:id]
 */
router.get("/user/:userId/checklists/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;
  try {
    let checklist = await checklistsData.getChecklistById(id.trim(), userId.trim());
    return res.status(200).json(checklist);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to fetch checklist from database." });
  }
});

/**
 * [POST /user/:userId/checklists]
 */
router.post("/user/:userId/checklists/", async (req: any, res: any) => {
  const userId = req.params.userId;
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
    let new_checklist = await checklistsData.createChecklist(
      userId.trim(),
      title,
      color
    );
    return res.status(200).json(new_checklist);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to create new checklist.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /user/:userId/checklists/:id]
 */
router.patch("/user/:userId/checklists/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;
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
    checklist = await checklistsData.getChecklistById(id.trim(), userId.trim());
    if (!checklist) {
      return res.status(400).json({
        error: `Checklist with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
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
      userId.trim(),
      checklist
    );
    return res.status(200).json(updated_checklist);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to update checklist.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /user/:userId/checklists/:id/:groupId]
 */
router.patch("/user/:userId/checklists/:id/:groupId", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const groupId = req.params.groupId;

  // Check if checklist exists
  let checklist;
  try {
    checklist = await checklistsData.getChecklistById(id.trim(), userId.trim());
    if (!checklist) {
      return res.status(400).json({
        error: `Checklist with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
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
        groupId.trim(),
        userId.trim()
      );
      return res.status(200).json(checklist);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to remove group from checklist.",
        message: e.toString(),
      });
    }
  } else {
    try {
      checklist = await checklistsData.addGroupToChecklist(
        id.trim(),
        groupId.trim(),
        userId.trim()
      );
      return res.status(200).json(checklist);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: "Failed to add group to checklist.",
        message: e.toString(),
      });
    }
  }
});

/**
 * [DELETE /user/:userId/checklists/:id]
 */
router.delete("/user/:userId/checklists/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;

  // Check if checklist exists
  let checklist;
  try {
    checklist = await checklistsData.getChecklistById(id.trim(), userId.trim());
    if (!checklist) {
      return res.status(400).json({
        error: `Checklist with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch checklist.",
      message: e.toString(),
    });
  }

  // Delete the checklist
  try {
    let delete_status = await checklistsData.deleteChecklistById(
      id.trim(),
      userId
    );
    return res.status(200).json({ success: delete_status });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to delete checklist.",
      message: e.toString(),
    });
  }
});

/**
 * [GET /user/:userId/checklists/:id/item/:item_id]
 */
router.get("/user/:userId/checklists/:id/item/:item_id", async (req: any, res: any) => {
  const id = req.params.id;
  const item_id = req.params.item_id;
  const userId = req.params.userId;

  // Check if checklist exists
  let checklist;
  try {
    checklist = await checklistsData.getChecklistById(id.trim(), userId.trim());
    if (!checklist) {
      return res.status(400).json({
        error: `Checklist with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch checklist.",
      message: e.toString(),
    });
  }

  // Fetch item from checklist
  try {
    let checklistItem = await checklistsData.getChecklistItemById(
      id.trim(),
      item_id.trim(),
      userId.trim()
    );
    return res.status(200).json(checklistItem);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch checklist item from database.",
      message: e.toString(),
    });
  }
});

/**
 * [POST /user/:userId/checklists/:id/item]
 */
router.post("/user/:userId/checklists/:id/item", async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.params.userId;

  // Check if checklist exists
  let checklist;
  try {
    checklist = await checklistsData.getChecklistById(id.trim(), userId.trim());
    if (!checklist) {
      return res.status(400).json({
        error: `Checklist with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
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
      userId.trim(),
      ""
    );
    return res.status(200).json(updated_checklist);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to add new item to checklist.",
      message: e.toString(),
    });
  }
});

/**
 * [PATCH /user/:userId/checklists/:id/item/:item_id]
 */
router.patch("/user/:userId/checklists/:id/item/:item_id", async (req: any, res: any) => {
  const id = req.params.id;
  const item_id = req.params.item_id;
  const userId = req.params.userId;
  const content = req.body.content;
  const checked = req.body.checked;
  // const index = req.body.index;

  if (typeof checked !== "boolean" && typeof checked !== "undefined") {
    return res.status(400).json({
      error: `Item status '${checked}' is not a valid boolean.`,
    });
  }

  // if (typeof index !== "number") {
  //   return res.status(400).json({
  //     error: `Item index '${index}' is not a valid number.`,
  //   });
  // }

  // Check if checklist exists
  let checklist;
  try {
    checklist = await checklistsData.getChecklistById(id.trim(), userId.trim());
    if (!checklist) {
      return res.status(400).json({
        error: `Checklist with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to fetch checklist.",
      message: e.toString(),
    });
  }

  // // Check if valid index
  // if (index > checklist.items.length || index < 0) {
  //   return res.status(500).json({
  //     error: `Item index '${index}' is out of range.`,
  //   });
  // }

  // Check if checklist item exists
  let checklistItem;
  try {
    checklistItem = await checklistsData.getChecklistItemById(
      id.trim(),
      item_id.trim(),
      userId.trim()
    );
    if (!checklistItem) {
      return res.status(400).json({
        error: `Checklist item with id ${item_id.trim()} in checklist with id ${id} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
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
  // if (index != null) {
  //   checklistItem.index = index;
  // }

  // Update the checklist
  try {
    let updated_checklist = await checklistsData.updateChecklistItemById(
      id.trim(),
      userId.trim(),
      checklistItem
    );
    return res.status(200).json(updated_checklist);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to update checklist item.",
      message: e.toString(),
    });
  }
});

/**
 * [DELETE /user/:userId/checklists/:id/item/:item_id]
 */
router.delete("/user/:userId/checklists/:id/item/:item_id", async (req: any, res: any) => {
  const id = req.params.id;
  const item_id = req.params.item_id;
  const userId = req.params.userId;

  // Check if checklist exists
  let checklist;
  try {
    checklist = await checklistsData.getChecklistById(id.trim(), userId.trim());
    if (!checklist) {
      return res.status(400).json({
        error: `Checklist with id ${id.trim()} was not found.`,
      });
    }
  } catch (e: any) {
    console.log(e);
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
      item_id.trim(),
      userId.trim()
    );
    return res.status(200).json({ success: delete_status });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: "Failed to remove item from checklist.",
      message: e.toString(),
    });
  }
});

module.exports = router;
