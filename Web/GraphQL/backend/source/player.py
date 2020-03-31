import graphene
from datetime import date
import random
import asyncio


players = []


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

    def mutate(parrent, info, username=None):
        if find_player(username) is None:
            player = Player(
                username=username,
                score=random.uniform(0.0, 100.0),
                alive=True,
                date_joined=date.today()
            )

            players.append(player)

            return AddPlayer(
                    username=player.username,
                    score=player.score,
                    alive=player.alive,
                    date_joined=player.date_joined)


class ChangePlayer(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        score = graphene.Int()
        alive = graphene.Boolean()

    username = graphene.String()
    score = graphene.Int()
    alive = graphene.Boolean()
    date_joined = graphene.Date()

    def mutate(parrent, info, username=None, score=None, alive=None):
        player = find_player(username)
        if player is not None:
            return ChangePlayer(
                username=username,
                score=score if score is not None else player.score,
                alive=alive if alive is not None else player.alive,
                date_joined=player.date_joined
            )


class Subscription(graphene.ObjectType):
    player_added = graphene.Field(Player)

    async def resolve_player_added(parrent, info):
        print('Sub activated\n')
        yield next(players, None)


class Mutations(graphene.ObjectType):
    new_player = AddPlayer.Field()
    change_player = ChangePlayer.Field()


schema = graphene.Schema(
                    query=Query,
                    mutation=Mutations,
                    subscription=Subscription)
