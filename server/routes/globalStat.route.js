const router = require("express").Router();
const { sequelize } = require("../db/models");

router.get("/", async (req, res) => {
  const result =
    await sequelize.query(`SELECT "Users"."username","Users"."avatar_url",
  COUNT(CASE
    WHEN "is_solved" = true
    THEN 1
    ELSE NULL
    END) AS "correctAnswers",
    COUNT(CASE
      WHEN "is_solved" = false
      THEN 1
      ELSE NULL
      END) AS "wrongAnswers",
COUNT(DISTINCT "FinishedQuestions"."room_id") AS "gamesCount"
  FROM "Users"
  INNER JOIN "FinishedQuestions"
  ON "Users"."id" = "FinishedQuestions"."user_id"

  GROUP BY "Users"."username","Users"."avatar_url"
  ORDER BY "correctAnswers" DESC;`);

  res.json(result[0]);
});

module.exports = router;
