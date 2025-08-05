import { FolderClosed } from "lucide-react";
import React from "react";

function RateLimitedUI() {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button className="btn btn-square btn-sm">
            <FolderClosed className="size-5" />
          </button>
        </div>
        <p>Your late limit has been reached.</p>
        <p>Try again in a few minutes.</p>
      </div>
    </div>
  );
}

export default RateLimitedUI;
