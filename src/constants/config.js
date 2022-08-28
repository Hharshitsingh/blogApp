

export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading",
        message: "Please wait..."
    },
    success: {
        title: "Success",
        message: "Operation completed successfully"
    },
    resposeFailure: {
        title: "Error",
        message: "Operation failed, Try again later"
    },
    requestFailure: {
        title: "Error",
        message: "Request failed, Try again later"
    },
    unauthorized: {
        title: "Error",
        message: "Unauthorized"
    },
    notFound: {
        title: "Error",
        message: "Unable Connect with server"
    }
}


export const SERVICE_URL = {
    userSignup: { url: "/signup", method: "POST" },
    userLogin: { url: "/login", method: "POST" },
    uploadFile: { url: "/file/upload", method: "POST" },
    createPost: { url: "/create", method: "POST" },
    getAllPosts: { url: "/posts", method: "GET", params: true },
    getOnePost : { url: "/post", method: "GET", query: true },
    updatePost : { url: "/update", method: "PUT", query: true },
    deletePost : { url: "/delete", method: "DELETE", query: true },
    addComment : { url: "/comment/add", method: "POST"},
    getAllComments : { url: "/comment", method: "GET", query: true },
    deleteComment : { url: "/comment", method: "DELETE", query: true },
    conctactUs : { url: "/contact", method: "POST" },
    getProfile: { url: "/profile", method: "GET", query: true },
    editProfile: { url: "/editProfile", method: "PUT", query: true },
}
