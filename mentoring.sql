CREATE SEQUENCE IF NOT EXISTS users_seq START 1;
CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    login character varying NOT NULL,
    email character varying NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE IF NOT EXISTS products_seq START 1;
CREATE TABLE IF NOT EXISTS public.products
(
    id bigint NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id)
);

INSERT INTO users (1, 'abba', 'terminator', 'abbter', 'pteradaktel@haha.com');
INSERT INTO users (2, 'abba1', 'terminator1', 'abbter1', 'pteradaktel1@haha.com');
INSERT INTO users (3, 'abba2', 'terminator2', 'abbter2', 'pteradaktel2@haha.com');
INSERT INTO users (4, 'abba3', 'terminator3', 'abbter3', 'pteradaktel3@haha.com');

INSERT INTO products (1, 'just_product_1', 'opdoapsjdaodjopasjdoapsdjpajsdpasdajsdpasjdpoasdjpa');
INSERT INTO products (2, 'just_product_2', 'ojiojqweiqowejqwjeoqweiwieiqiweiieieieieieieieeiieie');
