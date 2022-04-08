"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Games",
      [
        {
          topic_id: 1,
          user_id: 1,
          title: "Игра для презентации 1",
          description: "",
          img_url: "game",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 1,
          user_id: 1,
          title: "Игра для презентации 2",
          description: "",
          img_url: "game",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 2,
          user_id: 1,
          title: "Искусствовед",
          description: "Классная игра про искусство",
          img_url: "art",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 3,
          user_id: 1,
          title: "Географ глобус пропил",
          description: "Классная игра про географию",
          img_url: "geo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 4,
          user_id: 1,
          title: "О спорт, ты — мир!",
          description: "Классная игра про спорт",
          img_url: "sport",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 5,
          user_id: 1,
          title: "Специальная военная операция",
          description: "Классная игра про войну",
          img_url: "war",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 6,
          user_id: 1,
          title: "Все мы вышли из гоголевской шинели",
          description: "Классная игра про литературу",
          img_url: "lit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 7,
          user_id: 1,
          title: "Наука – знание глупых чужих мнений",
          description: "Классная игра про точные науки",
          img_url: "sci",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 8,
          user_id: 1,
          title: "Антон Долин",
          description: "Классная игра про театр и кино",
          img_url: "film",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 9,
          user_id: 1,
          title: "Блондинка в шоколаде",
          description: "Классная игра про светскую жизнь",
          img_url: "svet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 10,
          user_id: 1,
          title: "Стыд, стыд, стыд – вот история человека!",
          description: "Классная игра про историю",
          img_url: "hist",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic_id: 11,
          user_id: 1,
          title: "Тебе повезёт",
          description: "Классная игра случайного характера",
          img_url: "rand",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null, {});
  },
};
