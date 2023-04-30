import  Appmain from "../App"
import {connect} from 'react-redux'
import {createTeam} from "../redux/Actions/actions"



const mapStateToProps=state=>({
    teamData:state.TeamMembers.teamData
})
const mapDipatchToProps=dispatch=>({
    
        createTeamHandler:data=>dispatch(createTeam)
})
export default connect(mapStateToProps,mapDipatchToProps)(Appmain);