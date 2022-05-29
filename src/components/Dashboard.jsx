import React, { PureComponent }  from 'react';
import { connect } from 'react-redux';
import {withRouter} from '../utils/withRouter';
import AuthActions from "../reducers/AuthActions";

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);
        this.toCourse = this.toCourse.bind(this);
        }

    componentDidMount() {
        this.props.setPath("Dashboard");
    }

    toCourse(){
      // this.props.navigate("/courseSearch")
    }

    render() {
        return (
            <div>
            </div>
            // <g.Box direction="row" >

            //     <g.Sidebar background="light-3" height="500px" width="100px"
            //         header={
            //             <g.Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
            //         }>
            //         <g.Nav gap="medium">
            //             <g.Button icon={<i class="fa-solid fa-house"></i>} label="Home" plain={true} hoverIndicator />
            //             <g.Button icon={<i class="fa-solid fa-user"></i>} label="Profile" plain={true} hoverIndicator />
            //         </g.Nav>
            //     </g.Sidebar>
            //     <g.Box pad="small">
            //         <g.Heading size="small" >Welcome {this.props.user ? this.props.user.account.name : ""}</g.Heading>
            //         <g.Box pad="small" direction="row">
            //             <g.Card height="small" width="300px" background="accent-3" margin="10px">
            //                 <g.CardBody pad="medium" direction="row" >
            //                     <g.Box> <i class="fa-solid fa-user icon-card"></i> </g.Box>
            //                     <g.Anchor label="Profile" color="active-text" alignSelf="center" size="xlarge" margin="10px" />
            //                 </g.CardBody>
            //             </g.Card>
            //             <g.Card height="small" width="300px" background="accent-4" margin="10px">
            //                 <g.CardBody pad="medium" direction="row" >
            //                     <g.Box> <i class="fas fa-book icon-card"></i> </g.Box>
            //                     <g.Anchor onClick={()=>this.toCourse()} label="Courses" color="active-text" alignSelf="center" size="xlarge" margin="10px" />
            //                 </g.CardBody>
            //             </g.Card>
            //         </g.Box>
            //     </g.Box>
            // </g.Box>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setPath: (path) => dispatch(AuthActions.setPath(path)),
});

const mapStateToProps = (state) => ({
    user: state.auth.user
});

Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default withRouter(Dashboard);