import axios from 'axios';

const posts = {
  actions: {
    // POSTS
    async postPost(store, post) {
      const request = await axios.post(`/api/shelters/${post.shelterId}/posts`, post);
      return request.data;
    },
    async updatePostById(store, { postId, post }) {
      const request = await axios.put(`/api/posts/${postId}`, post);
      return request.data;
    },
    async deletePostById(store, postId) {
      const request = await axios.delete(`/api/posts/${postId}`);
      return request.data;
    },
  },
};

export default posts;
