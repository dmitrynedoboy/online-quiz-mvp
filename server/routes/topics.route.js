const router = require("express").Router();
const { Topic, Game } = require("../db/models");
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Отправляем из базы все топики
router.get("/", async (req, res) => {
  const topics = await Topic.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  res.json(topics);
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Отправляем по выбранному топику ИГРУ  (Status:ok)
router.get("/:id/games", async (req, res) => {
  const { id } = req.params;
  try {
    const allGames = await Game.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { topic_id: id },
    });

    res.json(allGames);
  } catch (err) {
    console.error(err);
  }
});

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Записываем в базу прилетевшие вопросы и ответы (Status:waiting)
router.post("game/:id", (req, res) => {
  const { type, question, answer } = req.body;
});

module.exports = router;
