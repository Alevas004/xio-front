import { RootState } from "@/redux/store";
import { NextRequest, NextResponse } from "next/server";
import { useSelector } from "react-redux";

export const JustAdmin = (request: NextRequest) => {
  const isAdmin = useSelector((store: RootState) => store.auth.isAdmin);
  if (!isAdmin) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
};

export const config = {
  matcher: ["/godness/admin/:path*"],
};
