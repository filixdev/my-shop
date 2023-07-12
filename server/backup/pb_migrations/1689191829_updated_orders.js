migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s1fdtap7oj49u8p")

  // remove
  collection.schema.removeField("j5miqqgs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "irmfhgd2",
    "name": "total",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s1fdtap7oj49u8p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j5miqqgs",
    "name": "total",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("irmfhgd2")

  return dao.saveCollection(collection)
})
