import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';    // importing from custom axios instance 

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    // best place to make api calls or execute 'side-effects'
    componentDidMount() {
        axios.get("/posts")
            .then( response => {
                // transforming received response data
                const posts = response.data.slice(0, 6);
                const updatedPosts = posts.map( post => {
                    return {
                        ...post,
                        author: 'Mr A'
                    }
                } );
                this.setState( { posts: updatedPosts } );
            } )
            .catch( err => {
                // console.log(err);
                this.setState({ error: true });
            } );
    }

    postSelected = (postId) => {
        this.setState({ selectedPostId: postId });
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something Went Wrong!!!</p>

        if(!this.state.error)
            posts = this.state.posts.map( post => {
                return <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelected(post.id)}/>
            } );

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;