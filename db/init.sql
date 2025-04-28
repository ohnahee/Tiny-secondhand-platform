-- PostgreSQL database dump

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-26 21:36:01

-- (불필요한 SET 구문 전부 삭제했음)

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

-- products 테이블 생성
CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    price integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url text,
    user_id integer
);

ALTER TABLE public.products OWNER TO postgres;

-- products_id_seq 시퀀스 생성
CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.products_id_seq OWNER TO postgres;
ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;

-- users 테이블 생성
CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);

ALTER TABLE public.users OWNER TO postgres;

-- users_id_seq 시퀀스 생성
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.users_id_seq OWNER TO postgres;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

-- 기본 키 설정
ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

-- 데이터 삽입
COPY public.products (id, name, description, price, created_at, image_url, user_id) FROM stdin;
7	시든 버섯	시든 버섯입니다	1500	2025-04-25 04:28:46.862803	/uploads/image_1745555326809_341913870.png	1
6	목이 긴 버섯	목이 긴 버섯입니다	19000	2025-04-25 04:20:18.259398	/uploads/image_1745554818194_815168706.jpg	1
\.

COPY public.users (id, username, email, password) FROM stdin;
4	admin	admin@hehe.com	$2b$10$Ie2Zh0KAu0i4xqNjYjMhRungCaIj/DvL64LmZ6fNfSM2h7JLgIyge
1	희	hee@naver.com	$2b$10$B5.3eSJBw4W/BIZ.pjoWDOmpTvFLrOwYk47JUyYUZrDhAE6gD/RWC
\.

-- 시퀀스 값 맞추기
SELECT pg_catalog.setval('public.products_id_seq', 9, true);
SELECT pg_catalog.setval('public.users_id_seq', 4, true);

-- 제약조건 추가
ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

-- Completed on 2025-04-26 21:36:01

-- PostgreSQL database dump complete
