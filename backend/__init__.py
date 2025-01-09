import fastapi
from fastapi.middleware.cors import CORSMiddleware
from .utils import load_configs


cfg = load_configs()

app = fastapi.FastAPI()


from backend.api.auth.handlers import router as auth_router
app.include_router(auth_router)


origins = [
    'http://localhost:3000',
    'http://localhost:4200',
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
