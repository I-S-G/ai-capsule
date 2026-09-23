import express from "express";
import prisma from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

// GET /api/capsules
router.get("/", async (req, res) => {
  try {
    const capsules = await prisma.capsule.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(capsules);
  } catch (error) {
    console.error("GET capsules error:", error);

    res.status(500).json({
      error: "Failed to fetch capsules",
    });
  }
});

// POST /api/capsules
router.post("/", async (req, res) => {
  try {
    const {
      projectName,
      promptTitle,
      promptVersion,
      promptText,
      responseSummary,
      category,
      usefulness,
      reviewed,
      improved,
      screenshotUrl,
      notes,
    } = req.body;

    // Required fields
    if (!projectName || !promptTitle || !promptText) {
      return res.status(400).json({
        error: "project_name, prompt_title and prompt_text are required",
      });
    }

    const capsule = await prisma.capsule.create({
      data: {
        userId: req.user.userId,

        projectName,
        promptTitle,
        promptVersion: promptVersion || null,
        promptText,
        responseSummary: responseSummary || null,
        category: category || null,
        usefulness: usefulness || null,
        reviewed: Boolean(reviewed),
        improved: Boolean(improved),
        screenshotUrl: screenshotUrl || null,
        notes: notes || null,
      },
    });

    res.status(201).json(capsule);
  } catch (error) {
    console.error("POST capsule error:", error);

    res.status(500).json({
      error: "Failed to create capsule",
    });
  }
});

// PUT /api/capsules/:id
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid capsule ID",
      });
    }

    const existingCapsule = await prisma.capsule.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!existingCapsule) {
      return res.status(404).json({
        error: "Capsule not found",
      });
    }

    const {
      projectName,
      promptTitle,
      promptVersion,
      promptText,
      responseSummary,
      category,
      usefulness,
      reviewed,
      improved,
      screenshotUrl,
      notes,
    } = req.body;

    if (!projectName || !promptTitle || !promptText) {
      return res.status(400).json({
        error: "project_name, prompt_title and prompt_text are required",
      });
    }

    const capsule = await prisma.capsule.update({
      where: {
        id,
      },
      data: {
        projectName,
        promptTitle,
        promptVersion: promptVersion || null,
        promptText,
        responseSummary: responseSummary || null,
        category: category || null,
        usefulness: usefulness || null,
        reviewed: Boolean(reviewed),
        improved: Boolean(improved),
        screenshotUrl: screenshotUrl || null,
        notes: notes || null,
      },
    });

    res.json(capsule);
  } catch (error) {
    console.error("PUT capsule error:", error);

    res.status(500).json({
      error: "Failed to update capsule",
    });
  }
});

// DELETE /api/capsules/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid capsule ID",
      });
    }

    const existingCapsule = await prisma.capsule.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!existingCapsule) {
      return res.status(404).json({
        error: "Capsule not found",
      });
    }

    await prisma.capsule.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("DELETE capsule error:", error);

    res.status(500).json({
      error: "Failed to delete capsule",
    });
  }
});

export default router;
