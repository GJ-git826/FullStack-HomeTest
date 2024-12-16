const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/tasks", async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});

app.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
        where: { id: Number(id) }
    });
    console.log(task)
    res.json(task)
})

app.post("/tasks", async (req, res) => {
    const { title, color } = req.body;
    const task = await prisma.task.create({
        data: { title, color },
    });
    res.json(task);
});

app.put("/tasks/:id", async (req, res)  => {
    const { id } = req.params;
    const { title, color, completed } = req.body;
    const task = await prisma.task.update({
        where: { id: Number(id) },
        data: { title, color, completed},
    });
    res.json(task);
})

app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Task deleted"});
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));