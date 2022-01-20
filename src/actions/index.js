export const addItems = (data,name) =>
{
    return({
        type:"Add_item",
        payload:{
            id:new Date().getTime().toString(),
            data:data,
            name:name
        }
    })
}

export const deleteItems = (id) =>
{
    return({
        type:"Delete_item",
        payload:{
        id:id}
    })
}

export const updateItems = (id,data) =>
{
    return({
        type:"Update_item",
        payload:{
            id:id,
            data:data
        }
    })
}

export const removeAllItems = () =>
{
    return({
        type:"Remove_all_items"
    })
}