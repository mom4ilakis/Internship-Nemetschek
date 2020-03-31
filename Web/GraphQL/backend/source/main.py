from sanic import Sanic
from sanic_graphql import GraphQLView
from sanic.response import json
from graphql.execution.executors.asyncio import AsyncioExecutor

from player import schema

app = Sanic(name="Sonic")


@app.route("/home")
async def test(request):
    return json({"hello": "world"})


@app.listener('before_server_start')
def init_graphql(app, loop):
    app.add_route(GraphQLView.as_view(schema=schema, graphiql=True, ), '/graphiql')
    app.add_route(GraphQLView.as_view(schema=schema, graphiql=True, executor=AsyncioExecutor(loop=loop)), '/graphql')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
