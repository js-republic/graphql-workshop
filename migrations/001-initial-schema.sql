-- Up
CREATE TABLE Category (id TEXT, name TEXT);
INSERT INTO Category (id, name) VALUES ("4e47e82b-f1ea-467d-af99-3e93a5f1cd5a", "Business");
INSERT INTO Category (id, name) VALUES ("89de0187-1a01-448d-91d0-acef655105ad", "Technology");

CREATE TABLE Post (id TEXT, categoryId INTEGER, title TEXT, content TEXT, CONSTRAINT Post_fk_categoryId FOREIGN KEY (categoryId) REFERENCES Category (id));
CREATE INDEX Post_ix_categoryId ON Post (categoryId);
INSERT INTO Post (id, title, content, categoryId) VALUES ("c5f99b86-7f1b-45e8-a02c-9f402cee1313", "eius molestias assumenda", "Enim illo sit excepturi reiciendis. Architecto error perspiciatis aut quia vel quisquam modi aut. Ad aperiam praesentium qui. Ipsa sit alias facere qui. Et suscipit sit et veniam aspernatur omnis optio aut.
 
Sapiente vel porro voluptatem voluptatem sed voluptatem et est architecto. Facilis sunt consequatur aut vitae eius provident pariatur velit. Quod velit sapiente non optio.
 
Autem fugiat doloribus autem sit sit veritatis aliquam est et. Reiciendis ipsa sit reiciendis voluptatem quam esse qui voluptatem. Sed in quas et asperiores.", "89de0187-1a01-448d-91d0-acef655105ad");
INSERT INTO Post (id, title, content, categoryId) VALUES ("5b6304b6-1b93-4bb8-8ef2-c89abfd5d17f", "beatae rem perspiciatis", "Et incidunt illum iure non odio consequatur magni. Qui molestiae et. Non laborum praesentium sed dolore veniam necessitatibus quaerat aut. Totam non qui deleniti. Veritatis et error quis consequatur quisquam ipsam qui omnis qui. Aut quaerat soluta et sit et quisquam laborum reiciendis.
 
Incidunt repudiandae eius. Sapiente et ut reprehenderit libero. Hic tenetur sed optio rerum ut laboriosam autem nostrum nihil. Sit ipsa totam iure sed qui et in. Minus et suscipit. Exercitationem vitae temporibus dignissimos alias et.
 
Non quod amet sequi eos. Maxime necessitatibus aliquid id tempora. Quia distinctio rerum quod minima id.", "89de0187-1a01-448d-91d0-acef655105ad");
INSERT INTO Post (id, title, content, categoryId) VALUES ("d2351672-5378-42cb-bfd9-18a999970679", "aut aut dolor", "Itaque non rerum quaerat rerum fugiat et. Sint rerum accusantium itaque qui et facilis dolores. Iure deserunt distinctio. Voluptas occaecati et earum inventore consequuntur cum distinctio vel. Aut dolorum ab provident.
 
Asperiores blanditiis repellat. Quia tempora occaecati ut. Incidunt libero aperiam voluptatem ullam autem minus nesciunt. Saepe enim ab tempore sunt expedita cupiditate temporibus et perspiciatis. Error distinctio a. Non est veniam odio ut minima voluptas id modi voluptatibus.
 
Praesentium ducimus itaque consequatur similique enim ut. Et molestiae omnis adipisci deserunt. Aliquam est numquam eos. Quia quia aut ipsa enim dolore consequatur et et facere. Distinctio voluptatem dolore recusandae itaque qui repellendus velit.", "89de0187-1a01-448d-91d0-acef655105ad");
INSERT INTO Post (id, title, content, categoryId) VALUES ("c86b74a9-23bc-46bb-b3b7-072b7d1f22d9", "aut nobis nisi", "Temporibus culpa cumque voluptas qui architecto. Impedit id quia suscipit molestiae quos. Velit qui qui aut saepe molestiae cum temporibus id vel. Nulla aut dolore.
 
Rerum et nostrum tenetur sint. Explicabo molestiae ullam. In atque in sit iusto quia voluptatibus architecto unde neque. Minima quos voluptatibus dolores sunt mollitia quia. Aut dolores nam ea vero soluta.
 
Necessitatibus minima sit alias et repudiandae praesentium nostrum beatae accusantium. Eligendi qui tempore fuga. Voluptates delectus et. Deleniti distinctio quia sequi quod deleniti molestias quis quia. Est excepturi magni quisquam repellat ab qui illum molestias. Sint non aut.", "89de0187-1a01-448d-91d0-acef655105ad");


CREATE TABLE Comment (id TEXT, postId INTEGER, content TEXT, CONSTRAINT Comment_fk_postId FOREIGN KEY (postId) REFERENCES Post (id));
CREATE INDEX Comment_fk_postId ON Comment (postId);
INSERT INTO Comment (id, content, postId) VALUES ("3ff74953-0124-44d6-950f-e2ddc0f4067f", "Congrats for this new blog", "c5f99b86-7f1b-45e8-a02c-9f402cee1313");
INSERT INTO Comment (id, content, postId) VALUES ("f185bd56-adcb-49bb-9164-3fbe7bfc6c53", "You new blog is so cool", "c5f99b86-7f1b-45e8-a02c-9f402cee1313");
INSERT INTO Comment (id, content, postId) VALUES ("ad720abb-961d-4859-a87a-ec1b4b327e36", "Really nice first technical blog post", "d2351672-5378-42cb-bfd9-18a999970679");

-- Down
DROP INDEX Comment_fk_postId;
DROP TABLE Comment;

DROP INDEX Post_ix_categoryId;
DROP TABLE Post;

DROP TABLE Category;