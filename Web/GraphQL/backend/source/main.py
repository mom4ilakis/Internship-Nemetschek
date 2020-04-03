from sanic import Sanic, response
from sanic_graphql import GraphQLView
from sanic.response import json
from graphql.execution.executors.asyncio import AsyncioExecutor
import asyncio
from player import schema

from graphql.execution.executors.asyncio import AsyncioExecutor
from graphql_ws.websockets_lib import WsLibSubscriptionServer

from template import render_graphiql


app = Sanic(name="Sonic")


# @app.route("/home")
# async def test(request):
#     return json({"hello": "world"})

subscription_server = WsLibSubscriptionServer(schema)


@app.listener('before_server_start')
def init_graphql(app, loop):

    schema.event_loop = loop
    subscription_server.loop = loop

    # app.add_route(
    #      GraphQLView.as_view(schema=schema, graphiql=True, allow_subscriptions=True),
    #      '/graphiql', methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])

    app.add_route(
        GraphQLView.as_view(
            schema=schema,
            graphiql=True,
            executor=AsyncioExecutor(loop=loop)),
        '/graphql', methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])


@app.route('/graphiql')
async def graphiql_view(request):
    return response.html(render_graphiql())


@app.websocket("/subscriptions", subprotocols=["graphql-ws"])
async def subscriptions(request, ws):
    await subscription_server.handle(ws)
    return ws

# if __name__ == "__main__":
app.run(host="0.0.0.0", port=8000)
