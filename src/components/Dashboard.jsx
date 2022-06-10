import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from '../utils/withRouter';
import AuthActions from "../reducers/AuthActions";
import PostCompose from './PostCompose';
import UniManActions from "../reducers/UniManActions";
import PostItem from "./PostItem"

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAllPosts().then(resolve => {
            this.props.posts.map((post) => {
                this.props.getLikes(post);
            }
            )
        }
        )
    }

    render() {
        let posts = this.props.posts;
        return (
            <div className="content">
                <PostCompose />
                {posts &&
                    posts.map((post) => {
                        return (
                            <PostItem
                                key={post.id}
                                postId={post.id}
                                userId={post.userDto.id}
                                firstName={post.userDto.name}
                                lastName={post.userDto.lastName}
                                content={post.comment}
                                loveList={post.likes}
                                addLove={this.props.addLove}
                                commentList={post.replies}
                                postDate={post.createdAt}
                                currentId={this.props.user.userDto.id}
                            />
                        );
                    })}
            </div>
        );

    }
}

const mapDispatchToProps = (dispatch) => ({
    setPath: (path) => dispatch(AuthActions.setPath(path)),
    fetchAllPosts: () => dispatch(UniManActions.fetchPosts()),
    getLikes: (post) => dispatch(UniManActions.getLikes(post)),
    addLove: (post) => dispatch(UniManActions.addLove(post)),
});

const mapStateToProps = (state) => ({
    user: state.auth.user,
    posts: state.uniManagment.posts,

});

Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default withRouter(Dashboard);