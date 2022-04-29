import axios from 'axios';


function fetchUnivList(){
    return axios.get('www.career.go.kr/cnet/openapi/getOpenApi?apiKey=9936f19d7c5d9d9463b5b70446af377e&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&perPage=10000')
}

export{
    fetchUnivList
}