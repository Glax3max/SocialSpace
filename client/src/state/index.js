import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    mode:"light",
    user:null,
    token:null,
    posts:[],
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setMode: (state) =>{
            state.mode = state.mode === "light"?"dark":"light";
        },
        setLogin :(state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout:(state) => {
            state.user = null;
            state.token = null;
        },
        setFriends : (state,action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            }else {
                console.log("User friend does not exist")
            }
        },
        setPosts:(state,action) => {
        state.posts = action.payload.posts
        },
        setPost:(state,action) => {
            const updatePosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            })
            state.posts = updatePosts
        },

    }
})


export const {setFriends,setLogin,setLogout,setPost,setPosts,setMode} = authSlice.actions;
export default authSlice.reducer
