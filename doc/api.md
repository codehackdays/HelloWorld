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


## View People

`GET`
`/rotas/people`

returns a list of People

   [
      {
        name: STRING
      }
   ]


## Add People

`POST`
`/rotas/people`

adds a person to our collection of people

   {
     name: STRING
   }
