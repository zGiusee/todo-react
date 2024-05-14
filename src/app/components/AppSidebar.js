/**************************************************************************** 
 ****************************************************************************
                    SIDEBAR AND SIDEBAR COMPONENTS 
*****************************************************************************
*****************************************************************************/
import SidebarList from "./SidebarList";
import User from "./User.js";
// import { useClient } from "next/client";

export default function AppSidebar({
  user,
  list,
  setTodosByListId,
  setSelectedList,
  selectedList,
}) {
  return (
    <div className="flex h-screen overflow-auto text-white bg-gray-600">
      <div className="">
        {/* USER INFO'S */}
        <div>
          <User name={user.name} image={user.image} id={user.id} />
        </div>

        <hr className="mx-5 text-white" />

        <div>
          <SidebarList
            list={list}
            setTodosByListId={setTodosByListId}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
          />
        </div>
      </div>
    </div>
  );
}
