# API documentation

## Add Events

`POST`
`/rotas/events`

adds an event to the rota

   {
      name: STRING
      description: STRING
      start: DATETIME
      end: DATETIME
   }


## View Events

`GET`
`/rotas/events`

returns a list of upcoming events

   [
      {
         name: STRING
         description: STRING
         start: DATETIME
         end: DATETIME
      }
      ...
   ]

