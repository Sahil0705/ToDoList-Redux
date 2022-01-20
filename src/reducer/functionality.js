let v = JSON.parse(localStorage.getItem("todolist_redux"));
if(!v)
    v = []

const initalList = {
    list : v,
    toggle: false,
    update:{
        u_id:"",
        u_data:""
    }
}

let updatedList;
const functionality = (state = initalList, action) =>
{
    switch(action.type)
    {
        case "Add_item":
            const {id, data, name} = action.payload;
            if(name=='Add')
            {
                // alert(name);
                if(data=='')
                    alert("Please enter an list item..");
                else
                {
                    updatedList = [
                        ...state.list,
                        {
                            id:id,
                            data:data
                        }
                    ]
                    return{
                        ...state,
                        list:[
                            ...state.list,
                            {
                                id:id,
                                data:data
                            }
                        ]
                    }
                }
            }
            else if(name=='Edit')
            {
                // alert(name);
                // console.log(state.update.u_id+" "+state.update.u_data);
                updatedList = state.list.map((curelem)=>
                {
                    // console.log(curelem.data);
                    if(curelem.id==state.update.u_id)
                    {
                        curelem.data = data;
                        // console.log(curelem.data);
                    }
                    return(curelem);
                })
                // console.log(state);
                // console.log(updatedList);
                return({
                    ...state,
                    list:updatedList,
                    toggle: false
                });
            }
            // localStorage.setItem("todolist_redux", JSON.stringify(updatedList));
        case "Delete_item":
            const del_id = action.payload.id;
            updatedList = state.list.filter((curelem)=>
            {
                if(curelem.id!=del_id)
                    return(curelem);
            })
            // console.log(updatedList);
            // localStorage.setItem("todolist_redux", JSON.stringify(updatedList));
            return({
                ...state,
                list:updatedList
            })
        case "Update_item":
            const {id:upd_id, data:upd_data} = action.payload;                    
            // console.log(upd_id+" "+upd_data);
            state.update.u_id = upd_id;
            state.update.u_data = upd_data;
            return({
                ...state,
                toggle:true
            });
        case "Remove_all_items":
            // localStorage.setItem("todolist_redux", JSON.stringify([]));
            return({
                ...state,
                list:[]
            })
        default : return(state);
    }
}

export default functionality