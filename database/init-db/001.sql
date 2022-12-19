-- Adminer 4.8.1 PostgreSQL 15.1 (Debian 15.1-1.pgdg110+1) dump

\connect "unipet";

CREATE SEQUENCE blog_blog_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."blog" (
    "blog_id" integer DEFAULT nextval('blog_blog_id_seq') NOT NULL,
    "title" text NOT NULL,
    "content" text NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "type" text,
    CONSTRAINT "blog_pkey" PRIMARY KEY ("blog_id")
) WITH (oids = false);

INSERT INTO "blog" ("blog_id", "title", "content", "created_at", "type") VALUES
(1,	'Descuento Comida',	'Hoy descuento comida perro y gato Unimarc',	'2022-11-27 21:57:12.128985+00',	'Publicidad'),
(2,	'Hogar Temporal',	'Se ofrece hospedaje temporal mascotas en situacion de calle',	'2022-11-27 21:57:43.029985+00',	'Caridad');

CREATE SEQUENCE chat_chat_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."chat" (
    "chat_id" integer DEFAULT nextval('chat_chat_id_seq') NOT NULL,
    "publication_id" integer NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "user_id" integer NOT NULL,
    CONSTRAINT "chat_pkey" PRIMARY KEY ("chat_id"),
    CONSTRAINT "chat_publication_id_user_id" UNIQUE ("publication_id", "user_id")
) WITH (oids = false);


CREATE SEQUENCE chat_message_chat_message_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."chat_message" (
    "chat_message_id" integer DEFAULT nextval('chat_message_chat_message_id_seq') NOT NULL,
    "chat_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "message" text NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "viewed" boolean DEFAULT false NOT NULL,
    CONSTRAINT "chat_message_pkey" PRIMARY KEY ("chat_message_id")
) WITH (oids = false);


CREATE TABLE "city" ("id" integer, "comuna" text, "region" text, "provincia" text);


CREATE SEQUENCE comunas_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."comunas" (
    "id" integer DEFAULT nextval('comunas_id_seq') NOT NULL,
    "comuna" text NOT NULL,
    "provincia_id" integer NOT NULL,
    CONSTRAINT "comunas_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "comunas" ("id", "comuna", "provincia_id") VALUES
(1,	'Arica',	1),
(2,	'Camarones',	1),
(3,	'General Lagos',	2),
(4,	'Putre',	2),
(5,	'Alto Hospicio',	3),
(6,	'Iquique',	3),
(7,	'Camiña',	4),
(8,	'Colchane',	4),
(9,	'Huara',	4),
(10,	'Pica',	4),
(11,	'Pozo Almonte',	4),
(12,	'Tocopilla',	5),
(13,	'María Elena',	5),
(14,	'Calama',	6),
(15,	'Ollague',	6),
(16,	'San Pedro de Atacama',	6),
(17,	'Antofagasta',	7),
(18,	'Mejillones',	7),
(19,	'Sierra Gorda',	7),
(20,	'Taltal',	7),
(21,	'Chañaral',	8),
(22,	'Diego de Almagro',	8),
(23,	'Copiapó',	9),
(24,	'Caldera',	9),
(25,	'Tierra Amarilla',	9),
(26,	'Vallenar',	10),
(27,	'Alto del Carmen',	10),
(28,	'Freirina',	10),
(29,	'Huasco',	10),
(30,	'La Serena',	11),
(31,	'Coquimbo',	11),
(32,	'Andacollo',	11),
(33,	'La Higuera',	11),
(34,	'Paihuano',	11),
(35,	'Vicuña',	11),
(36,	'Ovalle',	12),
(37,	'Combarbalá',	12),
(38,	'Monte Patria',	12),
(39,	'Punitaqui',	12),
(40,	'Río Hurtado',	12),
(41,	'Illapel',	13),
(42,	'Canela',	13),
(43,	'Los Vilos',	13),
(44,	'Salamanca',	13),
(45,	'La Ligua',	14),
(46,	'Cabildo',	14),
(47,	'Zapallar',	14),
(48,	'Papudo',	14),
(49,	'Petorca',	14),
(50,	'Los Andes',	15),
(51,	'San Esteban',	15),
(52,	'Calle Larga',	15),
(53,	'Rinconada',	15),
(54,	'San Felipe',	16),
(55,	'Llaillay',	16),
(56,	'Putaendo',	16),
(57,	'Santa María',	16),
(58,	'Catemu',	16),
(59,	'Panquehue',	16),
(60,	'Quillota',	17),
(61,	'La Cruz',	17),
(62,	'La Calera',	17),
(63,	'Nogales',	17),
(64,	'Hijuelas',	17),
(65,	'Valparaíso',	18),
(66,	'Viña del Mar',	18),
(67,	'Concón',	18),
(68,	'Quintero',	18),
(69,	'Puchuncaví',	18),
(70,	'Casablanca',	18),
(71,	'Juan Fernández',	18),
(72,	'San Antonio',	19),
(73,	'Cartagena',	19),
(74,	'El Tabo',	19),
(75,	'El Quisco',	19),
(76,	'Algarrobo',	19),
(77,	'Santo Domingo',	19),
(78,	'Isla de Pascua',	20),
(79,	'Quilpué',	21),
(80,	'Limache',	21),
(81,	'Olmué',	21),
(82,	'Villa Alemana',	21),
(83,	'Colina',	22),
(84,	'Lampa',	22),
(85,	'Tiltil',	22),
(86,	'Santiago',	23),
(87,	'Vitacura',	23),
(88,	'San Ramón',	23),
(89,	'San Miguel',	23),
(90,	'San Joaquín',	23),
(91,	'Renca',	23),
(92,	'Recoleta',	23),
(93,	'Quinta Normal',	23),
(94,	'Quilicura',	23),
(95,	'Pudahuel',	23),
(96,	'Providencia',	23),
(97,	'Peñalolén',	23),
(98,	'Pedro Aguirre Cerda',	23),
(99,	'Ñuñoa',	23),
(100,	'Maipú',	23),
(101,	'Macul',	23),
(102,	'Lo Prado',	23),
(103,	'Lo Espejo',	23),
(104,	'Lo Barnechea',	23),
(105,	'Las Condes',	23),
(106,	'La Reina',	23),
(107,	'La Pintana',	23),
(108,	'La Granja',	23),
(109,	'La Florida',	23),
(110,	'La Cisterna',	23),
(111,	'Independencia',	23),
(112,	'Huechuraba',	23),
(113,	'Estación Central',	23),
(114,	'El Bosque',	23),
(115,	'Conchalí',	23),
(116,	'Cerro Navia',	23),
(117,	'Cerrillos',	23),
(118,	'Puente Alto',	24),
(119,	'San José de Maipo',	24),
(120,	'Pirque',	24),
(121,	'San Bernardo',	25),
(122,	'Buin',	25),
(123,	'Paine',	25),
(124,	'Calera de Tango',	25),
(125,	'Melipilla',	26),
(126,	'Alhué',	26),
(127,	'Curacaví',	26),
(128,	'María Pinto',	26),
(129,	'San Pedro',	26),
(130,	'Isla de Maipo',	27),
(131,	'El Monte',	27),
(132,	'Padre Hurtado',	27),
(133,	'Peñaflor',	27),
(134,	'Talagante',	27),
(135,	'Codegua',	28),
(136,	'Coínco',	28),
(137,	'Coltauco',	28),
(138,	'Doñihue',	28),
(139,	'Graneros',	28),
(140,	'Las Cabras',	28),
(141,	'Machalí',	28),
(142,	'Malloa',	28),
(143,	'Mostazal',	28),
(144,	'Olivar',	28),
(145,	'Peumo',	28),
(146,	'Pichidegua',	28),
(147,	'Quinta de Tilcoco',	28),
(148,	'Rancagua',	28),
(149,	'Rengo',	28),
(150,	'Requínoa',	28),
(151,	'San Vicente de Tagua Tagua',	28),
(152,	'Chépica',	29),
(153,	'Chimbarongo',	29),
(154,	'Lolol',	29),
(155,	'Nancagua',	29),
(156,	'Palmilla',	29),
(157,	'Peralillo',	29),
(158,	'Placilla',	29),
(159,	'Pumanque',	29),
(160,	'San Fernando',	29),
(161,	'Santa Cruz',	29),
(162,	'La Estrella',	30),
(163,	'Litueche',	30),
(164,	'Marchigüe',	30),
(165,	'Navidad',	30),
(166,	'Paredones',	30),
(167,	'Pichilemu',	30),
(168,	'Curicó',	31),
(169,	'Hualañé',	31),
(170,	'Licantén',	31),
(171,	'Molina',	31),
(172,	'Rauco',	31),
(173,	'Romeral',	31),
(174,	'Sagrada Familia',	31),
(175,	'Teno',	31),
(176,	'Vichuquén',	31),
(177,	'Talca',	32),
(178,	'San Clemente',	32),
(179,	'Pelarco',	32),
(180,	'Pencahue',	32),
(181,	'Maule',	32),
(182,	'San Rafael',	32),
(183,	'Curepto',	33),
(184,	'Constitución',	32),
(185,	'Empedrado',	32),
(186,	'Río Claro',	32),
(187,	'Linares',	33),
(188,	'San Javier',	33),
(189,	'Parral',	33),
(190,	'Villa Alegre',	33),
(191,	'Longaví',	33),
(192,	'Colbún',	33),
(193,	'Retiro',	33),
(194,	'Yerbas Buenas',	33),
(195,	'Cauquenes',	34),
(196,	'Chanco',	34),
(197,	'Pelluhue',	34),
(198,	'Bulnes',	35),
(199,	'Chillán',	35),
(200,	'Chillán Viejo',	35),
(201,	'El Carmen',	35),
(202,	'Pemuco',	35),
(203,	'Pinto',	35),
(204,	'Quillón',	35),
(205,	'San Ignacio',	35),
(206,	'Yungay',	35),
(207,	'Cobquecura',	36),
(208,	'Coelemu',	36),
(209,	'Ninhue',	36),
(210,	'Portezuelo',	36),
(211,	'Quirihue',	36),
(212,	'Ránquil',	36),
(213,	'Treguaco',	36),
(214,	'San Carlos',	37),
(215,	'Coihueco',	37),
(216,	'San Nicolás',	37),
(217,	'Ñiquén',	37),
(218,	'San Fabián',	37),
(219,	'Alto Biobío',	38),
(220,	'Antuco',	38),
(221,	'Cabrero',	38),
(222,	'Laja',	38),
(223,	'Los Ángeles',	38),
(224,	'Mulchén',	38),
(225,	'Nacimiento',	38),
(226,	'Negrete',	38),
(227,	'Quilaco',	38),
(228,	'Quilleco',	38),
(229,	'San Rosendo',	38),
(230,	'Santa Bárbara',	38),
(231,	'Tucapel',	38),
(232,	'Yumbel',	38),
(233,	'Concepción',	39),
(234,	'Coronel',	39),
(235,	'Chiguayante',	39),
(236,	'Florida',	39),
(237,	'Hualpén',	39),
(238,	'Hualqui',	39),
(239,	'Lota',	39),
(240,	'Penco',	39),
(241,	'San Pedro de La Paz',	39),
(242,	'Santa Juana',	39),
(243,	'Talcahuano',	39),
(244,	'Tomé',	39),
(245,	'Arauco',	40),
(246,	'Cañete',	40),
(247,	'Contulmo',	40),
(248,	'Curanilahue',	40),
(249,	'Lebu',	40),
(250,	'Los Álamos',	40),
(251,	'Tirúa',	40),
(252,	'Angol',	41),
(253,	'Collipulli',	41),
(254,	'Curacautín',	41),
(255,	'Ercilla',	41),
(256,	'Lonquimay',	41),
(257,	'Los Sauces',	41),
(258,	'Lumaco',	41),
(259,	'Purén',	41),
(260,	'Renaico',	41),
(261,	'Traiguén',	41),
(262,	'Victoria',	41),
(263,	'Temuco',	42),
(264,	'Carahue',	42),
(265,	'Cholchol',	42),
(266,	'Cunco',	42),
(267,	'Curarrehue',	42),
(268,	'Freire',	42),
(269,	'Galvarino',	42),
(270,	'Gorbea',	42),
(271,	'Lautaro',	42),
(272,	'Loncoche',	42),
(273,	'Melipeuco',	42),
(274,	'Nueva Imperial',	42),
(275,	'Padre Las Casas',	42),
(276,	'Perquenco',	42),
(277,	'Pitrufquén',	42),
(278,	'Pucón',	42),
(279,	'Saavedra',	42),
(280,	'Teodoro Schmidt',	42),
(281,	'Toltén',	42),
(282,	'Vilcún',	42),
(283,	'Villarrica',	42),
(284,	'Valdivia',	43),
(285,	'Corral',	43),
(286,	'Lanco',	43),
(287,	'Los Lagos',	43),
(288,	'Máfil',	43),
(289,	'Mariquina',	43),
(290,	'Paillaco',	43),
(291,	'Panguipulli',	43),
(292,	'La Unión',	44),
(293,	'Futrono',	44),
(294,	'Lago Ranco',	44),
(295,	'Río Bueno',	44),
(296,	'Osorno',	45),
(297,	'Puerto Octay',	45),
(298,	'Purranque',	45),
(299,	'Puyehue',	45),
(300,	'Río Negro',	45),
(301,	'San Juan de la Costa',	45),
(302,	'San Pablo',	45),
(303,	'Calbuco',	46),
(304,	'Cochamó',	46),
(305,	'Fresia',	46),
(306,	'Frutillar',	46),
(307,	'Llanquihue',	46),
(308,	'Los Muermos',	46),
(309,	'Maullín',	46),
(310,	'Puerto Montt',	46),
(311,	'Puerto Varas',	46),
(312,	'Ancud',	47),
(313,	'Castro',	47),
(314,	'Chonchi',	47),
(315,	'Curaco de Vélez',	47),
(316,	'Dalcahue',	47),
(317,	'Puqueldón',	47),
(318,	'Queilén',	47),
(319,	'Quellón',	47),
(320,	'Quemchi',	47),
(321,	'Quinchao',	47),
(322,	'Chaitén',	48),
(323,	'Futaleufú',	48),
(324,	'Hualaihué',	48),
(325,	'Palena',	48),
(326,	'Lago Verde',	49),
(327,	'Coihaique',	49),
(328,	'Aysén',	50),
(329,	'Cisnes',	50),
(330,	'Guaitecas',	50),
(331,	'Río Ibáñez',	51),
(332,	'Chile Chico',	51),
(333,	'Cochrane',	52),
(335,	'Tortel',	52),
(336,	'Natales',	53),
(337,	'Torres del Paine',	53),
(338,	'Laguna Blanca',	54),
(339,	'Punta Arenas',	54),
(340,	'Río Verde',	54),
(341,	'San Gregorio',	54),
(342,	'Porvenir',	55),
(343,	'Primavera',	55),
(344,	'Timaukel',	55),
(345,	'Cabo de Hornos',	56),
(346,	'Antártica',	56),
(334,	'O''Higgins',	52);

CREATE SEQUENCE pet_type_pet_type_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."pet_type" (
    "pet_type_id" integer DEFAULT nextval('pet_type_pet_type_id_seq') NOT NULL,
    "pet_type" text NOT NULL,
    CONSTRAINT "pet_type_pkey" PRIMARY KEY ("pet_type_id")
) WITH (oids = false);

INSERT INTO "pet_type" ("pet_type_id", "pet_type") VALUES
(1,	'Perro'),
(3,	'Otro'),
(2,	'Gato');

CREATE SEQUENCE provincias_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."provincias" (
    "id" integer DEFAULT nextval('provincias_id_seq') NOT NULL,
    "provincia" text NOT NULL,
    "region_id" text NOT NULL,
    CONSTRAINT "provincias_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "provincias" ("id", "provincia", "region_id") VALUES
(1,	'Arica',	'1'),
(2,	'Parinacota',	'1'),
(3,	'Iquique',	'2'),
(4,	'El Tamarugal',	'2'),
(5,	'Tocopilla',	'3'),
(6,	'El Loa',	'3'),
(7,	'Antofagasta',	'3'),
(8,	'Chañaral',	'4'),
(9,	'Copiapó',	'4'),
(10,	'Huasco',	'4'),
(11,	'Elqui',	'5'),
(12,	'Limarí',	'5'),
(13,	'Choapa',	'5'),
(14,	'Petorca',	'6'),
(15,	'Los Andes',	'6'),
(16,	'San Felipe de Aconcagua',	'6'),
(17,	'Quillota',	'6'),
(18,	'Valparaiso',	'6'),
(19,	'San Antonio',	'6'),
(20,	'Isla de Pascua',	'6'),
(21,	'Marga Marga',	'6'),
(22,	'Chacabuco',	'7'),
(23,	'Santiago',	'7'),
(24,	'Cordillera',	'7'),
(25,	'Maipo',	'7'),
(26,	'Melipilla',	'7'),
(27,	'Talagante',	'7'),
(28,	'Cachapoal',	'8'),
(29,	'Colchagua',	'8'),
(30,	'Cardenal Caro',	'8'),
(31,	'Curicó',	'9'),
(32,	'Talca',	'9'),
(33,	'Linares',	'9'),
(34,	'Cauquenes',	'9'),
(35,	'Diguillín',	'10'),
(36,	'Itata',	'10'),
(37,	'Punilla',	'10'),
(38,	'Bio Bío',	'11'),
(39,	'Concepción',	'11'),
(40,	'Arauco',	'11'),
(41,	'Malleco',	'12'),
(42,	'Cautín',	'12'),
(43,	'Valdivia',	'13'),
(44,	'Ranco',	'13'),
(45,	'Osorno',	'14'),
(46,	'Llanquihue',	'14'),
(47,	'Chiloé',	'14'),
(48,	'Palena',	'14'),
(49,	'Coyhaique',	'15'),
(50,	'Aysén',	'15'),
(51,	'General Carrera',	'15'),
(52,	'Capitán Prat',	'15'),
(53,	'Última Esperanza',	'16'),
(54,	'Magallanes',	'16'),
(55,	'Tierra del Fuego',	'16'),
(56,	'Antártica Chilena',	'16');

CREATE SEQUENCE publication_publication_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."publication" (
    "publication_id" integer DEFAULT nextval('publication_publication_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "pet_name" text NOT NULL,
    "publication_status_id" smallint DEFAULT '3' NOT NULL,
    "pet_type_id" smallint NOT NULL,
    "pet_type_desc" text,
    "pub_type_id" smallint NOT NULL,
    "pub_type_desc" text,
    "age" smallint,
    "diseases" text,
    "description" text NOT NULL,
    "comune" smallint NOT NULL,
    "address" text NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "visits" integer DEFAULT '0' NOT NULL,
    CONSTRAINT "publication_pkey" PRIMARY KEY ("publication_id")
) WITH (oids = false);

CREATE OR REPLACE FUNCTION notify_trigger() 
RETURNS trigger AS $$
DECLARE
  payload JSONB;

BEGIN

IF NEW.publication_status_id = 1 AND OLD.publication_status_id != 1 THEN 

WITH "publication:data" AS (
  SELECT    to_jsonb(a) publication
  FROM      (
    SELECT  comuna, pet_type , imagenes, publication_id
    FROM    publications_view a
    WHERE   publication_id = NEW.publication_id
    AND     a.pub_type = 'Extraviado'
  ) a

), "user:data" AS (
  SELECT    jsonb_agg(to_jsonb(a))  users
  FROM  (
    SELECT  name, phone
    FROM    users a 
    JOIN    user_address b USING (user_id)
    JOIN    comunas  c ON b.comune = c.id
    JOIN    "publication:data" ON true
    WHERE   pet_finder = true
    AND     c.id = NEW.comune
  ) a
)
SELECT    to_jsonb(a)
INTO      payload
FROM      (
  SELECT    publication, users
  FROM      "publication:data" a,"user:data" b
) a;


  PERFORM   pg_notify('whatsapp', payload::text);
  
  RETURN NEW;

END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "whatsapp_notification" AFTER UPDATE ON "public"."publication" FOR EACH ROW EXECUTE FUNCTION notify_trigger();



CREATE TABLE "public"."publication_img" (
    "publication_id" integer NOT NULL,
    "img_code" text NOT NULL
) WITH (oids = false);


CREATE SEQUENCE publication_status_publication_status_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."publication_status" (
    "publication_status_id" smallint DEFAULT nextval('publication_status_publication_status_id_seq') NOT NULL,
    "status" text NOT NULL,
    CONSTRAINT "publication_status_pkey" PRIMARY KEY ("publication_status_id"),
    CONSTRAINT "publication_status_status" UNIQUE ("status")
) WITH (oids = false);


CREATE SEQUENCE publication_type_publication_type_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."publication_type" (
    "publication_type_id" integer DEFAULT nextval('publication_type_publication_type_id_seq') NOT NULL,
    "pub_type" text NOT NULL,
    CONSTRAINT "publication_type_pkey" PRIMARY KEY ("publication_type_id")
) WITH (oids = false);

INSERT INTO "publication_type" ("publication_type_id", "pub_type") VALUES
(1,	'Extraviado'),
(2,	'Encontrado'),
(3,	'Otro');
CREATE TABLE "publications_view" ("user_id" integer, "publication_id" integer, "pet_name" text, "pet_type" text, "pet_type_desc" text, "pub_type" text, "pub_type_desc" text, "age" smallint, "diseases" text, "description" text, "comuna" text, "region" text, "address" text, "created_at" timestamptz, "updated_at" timestamptz, "status" text, "visits" integer, "user" jsonb, "imagenes" jsonb);


CREATE SEQUENCE regiones_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."regiones" (
    "id" integer DEFAULT nextval('regiones_id_seq') NOT NULL,
    "region" text NOT NULL,
    "abreviatura" text NOT NULL,
    "capital" text NOT NULL,
    CONSTRAINT "regiones_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "regiones" ("id", "region", "abreviatura", "capital") VALUES
(1,	'Arica y Parinacota',	'AP',	'Arica'),
(2,	'Tarapacá',	'TA',	'Iquique'),
(3,	'Antofagasta',	'AN',	'Antofagasta'),
(4,	'Atacama',	'AT',	'Copiapó'),
(5,	'Coquimbo',	'CO',	'La Serena'),
(6,	'Valparaiso',	'VA',	'valparaíso'),
(7,	'Metropolitana de Santiago',	'RM',	'Santiago'),
(9,	'Maule',	'MA',	'Talca'),
(10,	'Ñuble',	'NB',	'Chillán'),
(11,	'Biobío',	'BI',	'Concepción'),
(12,	'La Araucanía',	'IAR',	'Temuco'),
(13,	'Los Ríos',	'LR',	'Valdivia'),
(14,	'Los Lagos',	'LL',	'Puerto Montt'),
(15,	'Aysén del General Carlos Ibáñez del Campo',	'AI',	'Coyhaique'),
(16,	'Magallanes y de la Antártica Chilena',	'MG',	'Punta Arenas');

CREATE SEQUENCE user_address_user_address_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."user_address" (
    "user_address_id" integer DEFAULT nextval('user_address_user_address_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "comune" smallint NOT NULL,
    "address" text,
    "description" text,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "user_address_pkey" PRIMARY KEY ("user_address_id")
) WITH (oids = false);


CREATE SEQUENCE users_user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."users" (
    "user_id" integer DEFAULT nextval('users_user_id_seq') NOT NULL,
    "rut" character(12),
    "email" text NOT NULL,
    "password" text NOT NULL,
    "name" text NOT NULL,
    "second_name" text,
    "surname" text NOT NULL,
    "second_suername" text,
    "phone" text NOT NULL,
    "mod" boolean DEFAULT false,
    "birth_date" timestamptz,
    "registration_date" timestamptz,
    "pet_finder" boolean DEFAULT false NOT NULL,
    CONSTRAINT "users_email_key" UNIQUE ("email"),
    CONSTRAINT "users_phone_key" UNIQUE ("phone"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id"),
    CONSTRAINT "users_rut_key" UNIQUE ("rut")
) WITH (oids = false);

INSERT INTO "users" ("rut", "email", "password", "name", "second_name", "surname", "second_suername", "phone", "mod", "birth_date", "registration_date", "pet_finder") VALUES
(NULL,	'benja@test.com',	'$2a$10$8Nl5IfB4QdgsgqNfNpx/7.uFdPf5tstaMGiJz7WHV/y.ArSEzhhKO',	'Benjamin',	NULL,	'Gomez',	NULL,	'73175292',	'1',	NULL,	NULL,	'1'),
(NULL,	'mapizarro0007@gmail.com',	'$2a$10$YHA7u92elZrLNKSTHuqmxuhQ.KkrKwainVwJJ4VTLqVai1A4.be8G',	'Martin ',	NULL,	'Pizarro',	NULL,	'53045526',	'1',	NULL,	NULL,	'1'),
(NULL,	'demcostap@gmail.com',	'$2a$10$5QKE4AqcPKWJ2maouppE9.ODTFUc2Lsq/UhiWua/wXmXcG.2dFDfi',	'Ostap',	NULL,	'Demcenco',	NULL,	'97550733',	'1',	NULL,	NULL,	'1');

ALTER TABLE ONLY "public"."comunas" ADD CONSTRAINT "comunas_provincia_id_fkey" FOREIGN KEY (provincia_id) REFERENCES provincias(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."publication" ADD CONSTRAINT "publication_comune_fkey" FOREIGN KEY (comune) REFERENCES comunas(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."publication" ADD CONSTRAINT "publication_pet_type_id_fkey" FOREIGN KEY (pet_type_id) REFERENCES pet_type(pet_type_id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."publication" ADD CONSTRAINT "publication_pub_type_id_fkey" FOREIGN KEY (pub_type_id) REFERENCES publication_type(publication_type_id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."publication" ADD CONSTRAINT "publication_status_fkey" FOREIGN KEY (publication_status_id) REFERENCES publication_status(publication_status_id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."publication" ADD CONSTRAINT "publication_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."publication_img" ADD CONSTRAINT "publication_img_publication_id_fkey" FOREIGN KEY (publication_id) REFERENCES publication(publication_id) ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."user_address" ADD CONSTRAINT "user_address_comune_fkey" FOREIGN KEY (comune) REFERENCES comunas(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id) NOT DEFERRABLE;





-- CREATE MATERIALIZED VIEW city AS 
-- (
-- 	SELECT  a.id, a.comuna, b.region, c.provincia
-- 	FROM 	comunas a
-- 	JOIN 	provincias c ON a.provincia_id = c.id
-- 	JOIN 	regiones b ON b.id = c.region_id::int
-- );

CREATE OR REPLACE FUNCTION "publications@"()
RETURNS TABLE (
    user_id int,
    publication_id int,
    pet_name text,
    pet_type text,
    pet_type_desc text,
    pub_type text,
    pub_type_desc text,
    age smallint,
    diseases text,
    description text,
    comune text,
    region text,
    address text,
    created_at timestamptz,
    updated_at timestamptz,
    status text,
    visits int,
    userdata jsonb,
    imagenes jsonb
) AS $$

WITH postdata AS 
(
    SELECT 		a.user_id,
                a.publication_id,
                a.pet_name,
                e.pet_type,
                a.pet_type_desc,
                d.pub_type,
                a.pub_type_desc,
                a.age,
                a.diseases,
                a.description,
                ci.comuna,
                ci.region,
                a.address,
                a.created_at,
                a.updated_at,
                c.status,
                a.visits
    FROM 		publication a
    JOIN        publication_status c ON a.publication_status_id	 = c.publication_status_id
    JOIN        pet_type e ON e.pet_type_id = a.pet_type_id
    JOIN        publication_type d ON d.publication_type_id = a.pub_type_id
    JOIN        city ci ON ci.id = a.comune
), postimg AS 
(
    SELECT      publication_id,  jsonb_agg(img_code) imagenes
    FROM        publication_img
    GROUP BY    publication_id
), userdata AS 
(
    SELECT      user_id, name, surname, email, phone
    FROM        users
)
SELECT      a.*, to_jsonb(c) user,  b.imagenes
FROM        postdata a
JOIN        userdata c ON c.user_id = a.user_id
LEFT JOIN   postimg  b ON a.publication_id = b.publication_id



$$ LANGUAGE SQL STABLE;


DROP TABLE IF EXISTS "city";
CREATE VIEW "city" AS SELECT a.id,
    a.comuna,
    b.region,
    c.provincia
   FROM ((comunas a
     JOIN provincias c ON ((a.provincia_id = c.id)))
     JOIN regiones b ON ((b.id = (c.region_id)::integer)));

DROP TABLE IF EXISTS "publications_view";
CREATE VIEW "publications_view" AS WITH postdata AS (
         SELECT a_1.user_id,
            a_1.publication_id,
            a_1.pet_name,
            e.pet_type,
            a_1.pet_type_desc,
            d.pub_type,
            a_1.pub_type_desc,
            a_1.age,
            a_1.diseases,
            a_1.description,
            ci.comuna,
            ci.region,
            a_1.address,
            a_1.created_at,
            a_1.updated_at,
            c_1.status,
            a_1.visits
           FROM ((((publication a_1
             JOIN publication_status c_1 ON ((a_1.publication_status_id = c_1.publication_status_id)))
             JOIN pet_type e ON ((e.pet_type_id = a_1.pet_type_id)))
             JOIN publication_type d ON ((d.publication_type_id = a_1.pub_type_id)))
             JOIN city ci ON ((ci.id = a_1.comune)))
        ), postimg AS (
         SELECT publication_img.publication_id,
            jsonb_agg(publication_img.img_code) AS imagenes
           FROM publication_img
          GROUP BY publication_img.publication_id
        ), userdata AS (
         SELECT users.user_id,
            users.name,
            users.surname,
            users.email,
            users.phone
           FROM users
        )
 SELECT a.user_id,
    a.publication_id,
    a.pet_name,
    a.pet_type,
    a.pet_type_desc,
    a.pub_type,
    a.pub_type_desc,
    a.age,
    a.diseases,
    a.description,
    a.comuna,
    a.region,
    a.address,
    a.created_at,
    a.updated_at,
    a.status,
    a.visits,
    to_jsonb(c.*) AS "user",
    b.imagenes
   FROM ((postdata a
     JOIN userdata c ON ((c.user_id = a.user_id)))
     LEFT JOIN postimg b ON ((a.publication_id = b.publication_id)));

-- 2022-12-19 17:45:15.062006+00
INSERT INTO "publication_status" ("publication_status_id", "status") VALUES
(1,	'Approved'),
(2,	'Rejected'),
(3,	'Pending'),
(5,	'Expired'),
(4,	'Incomplete'),
(6,	'Completed'),
(7,	'Cancelled');