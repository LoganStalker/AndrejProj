import fastapi
from typing import Annotated

from backend.api.auth_utils import check_credentials
from backend.models import User


router = fastapi.APIRouter(prefix="/api/users/v1/scrapper", tags=["scrapper"])


@router.post("/get")
async def scrap(request: fastapi.Request, user: Annotated[User, fastapi.Depends(check_credentials)]):
    data = await request.json()

    print("SCRAP DATA", data)

    return {"success": True, "text": "Some text"}
