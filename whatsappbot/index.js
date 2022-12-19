const venom = require("venom-bot");
const { pgclient } = require("./db");
require("./db");

venom
  .create({
    session: "session-unipet", //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  pgclient.on("notification", (msg) => {
    const data = JSON.parse(msg.payload);
    const pub = data.publication;

    for (const user of data.users) {
      const message = `Hola *${user.name}*!\n\nTe notificamos para informar que se extravio un ${pub.pet_type} en *${pub.comuna}*, que corresponde a la zona que registraste.\n\nLink Publicacion: \nhttps://unipet.ostap.io/p/${pub.publication_id}\n\nPuedes desactivar las notificaciones o cambiar/agregar direcciones en el siguente link: \nhttps://unipet.ostap.io/profile\n\n😺🐶
      `;

      client
        .sendImage(
          user.phone.substring(1) + "@c.us",
          `https://unipetminio.ostap.io/unipet/${pub.imagenes[0]}.jpg`,
          pub.imagenes[0],
          message
        )
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}
// async function testPostgresql() {
//   const { rows } = await query("SELECT * FROM users");
//   console.log(rows);
// }
// testPostgresql();

/*sql*/ `
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





CREATE TRIGGER whatsapp_notification AFTER UPDATE ON publication
FOR EACH ROW
EXECUTE PROCEDURE notify_trigger();
`;
