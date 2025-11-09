import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { error } from "node:console";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  let baseSlug = slugify(meal.title, { lower: true });
  let slug = baseSlug;
  let counter = 1;

  // Check if slug already exists and generate a unique one
  while (db.prepare("SELECT slug FROM meals WHERE slug = ?").get(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  meal.slug = slug;
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const imageFileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${imageFileName}`);

  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  meal.image = `/images/${imageFileName}`;

  db.prepare(
    `INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug) 
     VALUES(
          @title,
          @summary,
          @instructions,
          @creator,
          @creator_email,
          @image,
          @slug
    )`
  ).run(meal);
}
