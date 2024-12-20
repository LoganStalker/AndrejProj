import hashlib
import jwt
from peewee_aio import AIOModel, fields, Manager
import datetime as dt

from backend import cfg


db = Manager(
    cfg.PEEWEE_CONNECTION,
    **cfg.PEEWEE_CONNECTION_PARAMS
)


class BaseModel(AIOModel):
    id: int
    created = fields.DateTimeField(null=True, default=dt.datetime.now)
    updated = fields.DateTimeField(null=True, default=dt.datetime.now)



SECRET = "secret_key"


@db.register
class User(BaseModel):
    name = fields.CharField(null=True)
    email = fields.CharField(unique=True, null=False)
    password_hash = fields.CharField(null=True)

    def __str__(self):
        return f"User <#{self.id} {self.email}>"

    @property
    def token(self):
        return jwt.encode({"id": self.id, "email": self.email}, SECRET, algorithm="HS256")

    @classmethod
    async def load_from_token(cls, token):
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
        return (
            await cls.select()
            .where(cls.id == payload["id"], cls.email == payload["email"])
            .first()
        )

    async def set_password(self, password: str):
        self.password_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
        await self.save()
        return True

    def check_password(self, password: str):
        phash = hashlib.sha256(password.encode('utf-8')).hexdigest()
        return phash == self.password_hash
