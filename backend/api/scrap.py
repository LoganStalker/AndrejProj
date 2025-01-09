from fastapi import Request, APIRouter, Depends
from typing import Annotated

from backend.api.auth_utils import check_credentials
from backend.models import User

router = APIRouter(prefix="/api/scrap", tags=["scrapper"])


@router.get("/{x_profile_name}")
async def get_friends(request: Request, user: Annotated[User, Depends(check_credentials)]):
    x_profile_id = request.path_params.get('id')

    # CALL SCRAPPER HERE

    return {"success": True}
