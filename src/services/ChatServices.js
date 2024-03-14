import $api from '../API'

export default class ChatServices {
    static async get_chats() {
        return await $api.get(`v1/chat_message/list/`)
    }

    static async send_message(text, user_id) {
        return await $api.post(`v1/chat_message/create/`,
            {text, user_id},
            {
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"}
            })
    }

    static async update_message_status(status, pk) {
        return await $api.patch(`v1/chat_message/update/${pk}`,
            {status},
            {
                withCredentials: true
            }
        )
    }
}