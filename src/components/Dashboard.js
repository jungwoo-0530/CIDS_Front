import React, {Component, useEffect, useState} from "react";
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Search from '@material-ui/icons/Search';
import Person from '@material-ui/icons/Person';
import Location from '@material-ui/icons/LocationSearching';
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import { TableSimple } from 'react-pagination-table';
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardIcon from "./Card/CardIcon.js";
import CardBody from "./Card/CardBody.js";
import CardFooter from "./Card/CardFooter.js";
import Chartist from "chartist";
import cogoToast from "cogo-toast";
import axios from "axios";

import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Axios from "axios";

const useStyles = makeStyles(styles);


export default function Dashboard(d) {
    const [totalKeywordCount, setTotalKeywordCount] = useState(0);
    const [totalUserCount, setTotalUserCount] = useState(0);
    const [averageAccuracy, setAverageAccuracy] = useState(0);
    const [searchKeywordTop, setSearchKeywordTop] = useState([]);
    const [domainTop, setDomainTop] = useState([]);


    useEffect(()=>{
        getDashBoard();
    },[totalKeywordCount])


    const classes = useStyles();
    const dashStyle = {
        marginTop: "3%",
        marginLeft: "10%",
        marginRight: "10%"
    };

    const chart_data =  {
        labels: d.search_dates,
       series: [d.search_counts]
    }


    const getDashBoard = () =>{

        axios.get(`/dashboard`)
        .then(res =>{
            
            setTotalKeywordCount(res.data.data.keywordCount);
            setTotalUserCount(res.data.data.memberCount);
            setAverageAccuracy(res.data.data.averageAccuracy);
            setSearchKeywordTop(res.data.data.searchKeywords);
            setDomainTop(res.data.data.domains);

        })
        .catch(err=>{
            console.log(err);
        })

    }

    const getDate = () =>{
        let now = new Date();
        let todayMonth = now.getMonth() + 1;
        let todayDate = now.getDate();
        let todayYear = now.getFullYear();
        
        return todayYear+"년 "+todayMonth+"월 "+todayDate+"일 기준"
    }


    return (

        <div style={dashStyle}>
            <GridContainer>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <Search/>
                            </CardIcon>
                            <p className={classes.cardCategory}>총 키워드 검색 수</p>
                            <h3 className={classes.cardTitle}>{totalKeywordCount}<small>개</small></h3>

                        </CardHeader>
                        <CardFooter stats>
                            { d.today_keyword_count?
                                <div className={classes.stats}>
                                    <Update />
                                    updated few seconds ago
                                </div>
                                :
                                <div className={classes.stats}>
                                    -
                                </div>
                            }
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Person />
                            </CardIcon>
                            <p className={classes.cardCategory}>사용자 수</p>
                            <h3 className={classes.cardTitle}>{totalUserCount}<small>명</small></h3>

                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <ArrowUpward/>
                            </div>

                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="danger" stats icon>
                            <CardIcon color="danger">
                                <Location/>
                            </CardIcon>
                            <p className={classes.cardCategory}>평균 정확도</p>
                            <h3 className={classes.cardTitle}>{averageAccuracy}<small>%</small></h3>


                        </CardHeader>
                        <CardFooter stats>
                            { d.accuracy?
                                <div className={classes.stats}>
                                    <Update />
                                    updated few seconds ago
                                </div>
                                :
                                <div className={classes.stats}>
                                    -
                                </div>
                            }

                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>검색 키워드 Top 5</h4>
                            <a href="/ranking" className={classes.cardCategoryWhite}>
                                더보기
                            </a>
                        </CardHeader>
                        <CardBody>
                            <div className={classes.stats}>
                                {getDate()}
                            </div>
                            <TableSimple
                                headers={['Rank', 'Keyword']}
                                data={searchKeywordTop}
                                columns="rank.keyword"
                            />
                        </CardBody>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={5}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>의심 도메인 Top 5</h4>
                            <a href="/ranking" className={classes.cardCategoryWhite}>
                                더보기
                            </a>
                        </CardHeader>
                        <CardBody>
                            <div className={classes.stats}>
                                {getDate()}
                            </div>
                            <TableSimple
                                headers={['Rank', 'Domain']}
                                data={domainTop}
                                columns="rank.domain"
                                arrayOption={ [["rank", 'domain']] }
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
