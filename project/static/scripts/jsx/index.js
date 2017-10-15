import { Search, ResultsTable } from './components.js'
import { Button, Autocomplete } from 'react-materialize'

class HomePage extends React.Component {
  constructor(props){
    super(props);

    const courses = this.formatData(props.courses);
    const coursesids = this.getCourseIds(props.courses);
    const countries = this.formatData(props.countries);
    const universities = this.formatData(props.universities);

    this.state = { 
      courses: courses,
      coursesids: coursesids,
      countries: countries,
      universities: universities,
      results: props.results,
      isLoading: false,
      showArrowLine: false
    };

    this.formatData = this.formatData.bind(this);
    this.getResults = this.getResults.bind(this);
    this.updateResultValues = this.updateResultValues.bind(this);
  }

  formatData(values) {
    var formattedData = {};
    values.forEach((data) => {
      formattedData[data["name"]] = data["id"];
    });
    return formattedData;
  }

  getCourseIds(values) {
    var formattedData = {};
    values.forEach((data) => {
      formattedData[data["name"]] = data["id"];
    });
    return formattedData;
  }

  getResults() {
    // button onClick ajax call
    var self = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        self.updateResultValues(this.responseText);
      }
    };

    var courses = [];
    $(".search-list-item-Courses-ids").each(function() {
      courses.push($(this).val());
    });
    var universities = [];
    $(".search-list-item-Universities").each(function() {
      universities.push($(this).text());
    });
    var countries = [];
    $(".search-list-item-Countries").each(function() {
      countries.push($(this).text());
    });

    if (courses.length == 0) {
      courses = [];
    }
    if (universities.length == 0) {
      universities = [];
    }
    if (countries.length == 0) {
      countries = [];
    }

    var params = "/ajax/" + JSON.stringify(courses) + "/" + JSON.stringify(universities) + "/" + JSON.stringify(countries);
    console.log(params)
    xhttp.open("GET", params);
    xhttp.send();

    this.setState({
      isLoading: true
    });

    setTimeout(() => {
      $("#Courses").children().first().val("");
      $("#Universities").children().first().val("");
      $("#Countries").children().first().val("");
    }, 1);
  }

  // Get value of all form elements to send to ajax request
  updateResultValues(responseText) {
    console.log(typeof(responseText))
    this.setState({
      results: JSON.parse(responseText),
      isLoading: false,
      showArrowLine: true
    });
    console.log(responseText);

    setTimeout(() => {
      $("#Courses").children().first().val("");
      $("#Universities").children().first().val("");
      $("#Countries").children().first().val("");
    }, 1);
  }

  render() {
    return (
      <div>
        <Search data={ this.state.courses } dataType="Courses" />
        <Search data={ this.state.countries } dataType="Countries" />
        <Search data={ this.state.universities } dataType="Universities" />
        <br/>
        <Button waves='light' type="button" onClick={this.getResults} id="match-button">MATCH</Button>
        { this.state.isLoading == true ? <img src="static/imgs/loading.gif" id="loading-img" /> : <img src="" /> }
        <br/>
        { this.state.showArrowLine == true ? <img src="static/imgs/arrow-line.png" id="arrow-line-img" /> : <img src="" /> }
        <br/>
        <br/>
        <ResultsTable data={ this.state.results } />
      </div>
    )
  }
}
//          <Autocomplete title="Current university" data={ this.props.universities }></Autocomplete>

//         <ResultsTable data={ this.props.results, this.compare } />


window.onload = () => {
  let courses = JSON.parse(document.getElementById("coursesProps").innerHTML)
  let countries = JSON.parse(document.getElementById("countriesProps").innerHTML)
  let universities = JSON.parse(document.getElementById("universitiesProps").innerHTML)
  let results = JSON.parse(document.getElementById("resultsProps").innerHTML)
  // let universities = { universities|safe }
  // let courses = { courses|safe }
  // let countries = { countries|safe }
  // let results = { results|safe }
  // console.log(universities)

  ReactDOM.render(
    <HomePage universities={ universities } courses={ courses } countries={ countries } results={ results } />,
    document.getElementById('main')
  );

  $('#instructions-popup').fancybox().trigger('click');
}