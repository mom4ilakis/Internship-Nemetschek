import graphene
from datetime import date
import random
import json
import asyncio
import math

event_loop = None
players = []
queues = {}


def queue_of_type(type_change):

    if type_change not in queues:
        queues[type_change] = asyncio.Queue(loop=event_loop)
    return queues[type_change]


def find_player(username):
    return next((p for p in players if p.username == username), None)


class Player(graphene.ObjectType):
    username = graphene.NonNull(graphene.String)
    score = graphene.Int()
    alive = graphene.Boolean()
    date_joined = graphene.Date()


class PlayerList(graphene.ObjectType):
    player_list = graphene.List(Player)

    def resolve_player_list(parrent, info):
        return parrent.player_list


class Query(graphene.ObjectType):
    all_players = graphene.List(Player)
    player = graphene.Field(Player, username=graphene.String())

    def resolve_player(parrent, info, username):
        return find_player(username)

    def resolve_all_players(parrent, info):
        return players


class AddPlayer(graphene.Mutation):
    class Arguments:
        username = graphene.String()

    username = graphene.String()
    score = graphene.Int()
    alive = graphene.Boolean()
    date_joined = graphene.Date()

    async def mutate(parrent, info, username):
        if find_player(username) is None and username is not None:
            player = Player(
                username=username,
                score=random.uniform(0.0, 100.0),
                alive=True,
                date_joined=date.today()
            )

            players.append(player)
            await queue_of_type("added").put(player)
            return AddPlayer(
                    username=player.username,
                    score=player.score,
                    alive=player.alive,
                    date_joined=player.date_joined)


class RemovePlayer(graphene.Mutation):
    class Arguments:
        username = graphene.String()

    username = graphene.String()
    score = graphene.Int()
    alive = graphene.Boolean()
    date_joined = graphene.Date()

    async def mutate(parrent, info, username):
        player = find_player(username)
        global players
        if player is not None:
            new_players = filter(lambda p: p.username != username, players)
            players = new_players
            await queue_of_type("deleted").put(player)
            return player


class ChangePlayer(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        score = graphene.Int()
        alive = graphene.Boolean()

    username = graphene.String()
    score = graphene.Int()
    alive = graphene.Boolean()
    date_joined = graphene.Date()

    async def mutate(parrent, info, username=None, score=None, alive=None):
        player = find_player(username)
        if player is not None:
            player.score = score if score is not None else player.score
            player.alive = alive if alive is not None else player.alive
            await queue_of_type("changed").put(player)
            return ChangePlayer(
                username=username,
                score=player.score,
                alive=player.alive,
                date_joined=player.date_joined
            )


def number_generator():
    num = 0
    while True:
        yield num
        num += 1


class Change(graphene.ObjectType):
    player_changed = graphene.Field(Player)
    type_change = graphene.String()


class Subscription(graphene.ObjectType):
    player_changed = graphene.Field(graphene.String, type_change=graphene.String())

    async def resolve_player_changed(parrent, info, type_change):
        while True:
            change = await queue_of_type(type_change).get()
            if change is not None:
                yield f"{type_change}: username: {change.username}, score: {math.floor(change.score)}, alive: {change.alive}, joined on: {change.date_joined}"
            else:
                yield "No updates"


class Mutations(graphene.ObjectType):
    new_player = AddPlayer.Field()
    change_player = ChangePlayer.Field()
    remove_player = RemovePlayer.Field()


schema = graphene.Schema(
                    query=Query,
                    mutation=Mutations,
                    subscription=Subscription)
