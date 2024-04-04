CREATE TABLE "Auths" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "userId" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "confirmPassword" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  CONSTRAINT "Auths_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Auths" OWNER TO "postgres";

CREATE TABLE "CategoryItems" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  CONSTRAINT "CategoryItems_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "CategoryItems" OWNER TO "postgres";

CREATE TABLE "Companies" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "userId" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Companies" OWNER TO "postgres";

CREATE TABLE "Items" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "categoryId" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "imageUrl" varchar(255) COLLATE "pg_catalog"."default",
  "imageId" varchar(255) COLLATE "pg_catalog"."default",
  "stock" int4,
  "price" float8,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Items" OWNER TO "postgres";

CREATE TABLE "Stocks" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "companyId" varchar(255) COLLATE "pg_catalog"."default",
  "itemId" varchar(255) COLLATE "pg_catalog"."default",
  "stock" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Stocks" OWNER TO "postgres";

CREATE TABLE "Users" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "companyId" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "role" "public"."enum_Users_role",
  "imageUrl" varchar(255) COLLATE "pg_catalog"."default",
  "imageId" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Users" OWNER TO "postgres";

ALTER TABLE "CategoryItems" ADD CONSTRAINT "fk_CategoryItems_Items_1" FOREIGN KEY ("id") REFERENCES "Items" ("categoryId");
ALTER TABLE "Companies" ADD CONSTRAINT "fk_Companies_Stocks_1" FOREIGN KEY ("id") REFERENCES "Stocks" ("companyId");
ALTER TABLE "Items" ADD CONSTRAINT "fk_Items_Stocks_1" FOREIGN KEY ("id") REFERENCES "Stocks" ("itemId");
ALTER TABLE "Users" ADD CONSTRAINT "fk_Users_Companies_1" FOREIGN KEY ("id") REFERENCES "Companies" ("userId");
ALTER TABLE "Users" ADD CONSTRAINT "fk_Users_Auths_1" FOREIGN KEY ("id") REFERENCES "Auths" ("userId");

