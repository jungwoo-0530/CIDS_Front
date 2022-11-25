import React, {Component} from "react";

import HomepageForm from "./HomePage/HomePage";
import {Route, Switch} from "react-router-dom";
import RankingIndex from "./Service/RankingIndex";
import ServicePage from "./Service/ServicePage";
import DashboardPage from './Service/DashboardPage'
import {CssBaseline} from "@material-ui/core";
import InvalidPage from "./404Page";
//Member(User)
import JoinForm from "./User/JoinForm";
import LoginForm from "./User/LoginForm";
import UserPageForm from "./User/UserPageForm";
import LoginPage from "./LoginPage";
import UserList from './User/NewUserList';

//Board(Post)
import Post from "./components/Post/Post";
import PostList from "./components/Post/PostList";
import PostUpdate from "./components/Post/PostUpdate"
import PostQnAWirte from "./components/BbsQnAView";
import PostNotificationWrite from "./components/BbsNotificationView";
import PostSearchList from './components/Post/SearchPosts';
import BoardList from "./components/Post/BoardList"

import Upload from "./upload"

class Body extends Component {
    render() {
        return (
            <CssBaseline>
                <div>
                    <Switch>
                        <Route path="/boardList" component={BoardList}/>
            

                        <Route exact path="/posts/update" component={PostUpdate}/>
                        <Route exact path="/posts/qna/write" component={PostQnAWirte}/>
                        <Route exact path="/posts/notification/write" component={PostNotificationWrite}/>
                        
                        <Route exact path="/posts/:id" component={Post}/>
                        
                        <Route exact path="/qna" component={PostList}/>
                        <Route exact path="/notice" component={PostList}/>
                        <Route path="/uploads" component={Upload}/>
                        
                        <Route exact path="/post/search" component={PostSearchList}/>



                        <Route path="/userlist" component={UserList}/>
         


                        <Route path="/user/edit" component={UserPageForm}/>
                        <Route path="/user/login" component={LoginForm}/>
                        <Route path="/user/join" component={JoinForm}/>
                        <Route path="/dashboard" component={DashboardPage}/>
                        <Route path="/ranking" component={RankingIndex}/>
                        <Route path="/login" component={LoginPage}/>

                        <Route path="/service" component={ServicePage}/>

                        <Route exact path="/" component={HomepageForm}/>

                        <Route path="/*" component={InvalidPage}/>
                        <Route path="/error" component={InvalidPage}/>


                    </Switch>
                </div>
            </CssBaseline>
        );
    }
}

export default Body;
