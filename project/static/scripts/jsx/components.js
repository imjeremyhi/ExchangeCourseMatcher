import { Input, Table, Row, Button, Collection, CollectionItem, Collapsible, CollapsibleItem, Icon, Col, Tabs, Tab, Card, CardTitle } from 'react-materialize'
import Autocomplete from './Autocomplete.js'

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appendedList: [],
      data: props.data
    };

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    });

    // setTimeout(() => {
    //   $("#" + this.props.dataType).children().first().val("");
    // }, 100);
  }

  add(value) {
    console.log('here');
    var curVal = value;
    var data = this.state.data;

    if (curVal in data) {
      var curList = this.state.appendedList;
      curList.push(curVal);

      delete data[curVal];

      this.setState({
        appendedList: curList,
        data: data
      });

      if (this.props.dataType == "Countries") {
        this.props.handleCountriesFilterChange(this.state.appendedList);
      }

      //$("#" + this.props.dataType).children().first().val("");
    }
  }

  remove(listItem) {
    var curList = this.state.appendedList;

    var index = curList.indexOf(listItem);
    var item = curList[index];
    if (index > -1) {
      curList.splice(index, 1);
    }

    var data = this.state.data;
    data[item] = null;

    this.setState({
      appendedList: curList,
      data: data
    });

    if (this.props.dataType == "Countries") {
      this.props.handleCountriesFilterChange(this.state.appendedList);
    }

    // setTimeout(() => {
    //   $("#" + this.props.dataType).children().first().val("");
    // }, 100);
  }

  // todo collection onClick delete, have hover effect of bin
  //         <h1 style={{backgroundColor: "#C0C0C0", color: "#FFFFFF", textTransform: "uppercase"}}>Add { this.props.dataType }</h1>
  render() {
    return (
      <Card className='large' title={"Add " + this.props.dataType} id={this.props.dataType + "-card"}>
        <Row>
          <Autocomplete
            id={ this.props.dataType }
            title={ this.props.dataType }
            data={
              this.state.data
            }
            value=""
            onAutocomplete={this.add}
          />
        </Row>
        <Row id={"collection-" + this.props.dataType}>
        { this.state.appendedList.length > 0 &&
          <Collection>
            {this.state.appendedList.map((listItem) => {
              return (
                <Row>
                  <Col s={9}>
                    { this.props.dataType == "Courses" ? <input type="hidden" className={"search-list-item-" + this.props.dataType + "-ids"} value={this.props.ids[listItem]} /> : <input type="hidden" />}
                    <CollectionItem className={"search-list-item-" + this.props.dataType}>{listItem}</CollectionItem>
                  </Col>
                  <Col s={2}>
                    <Button href="#" type="button" onClick={() => this.remove(listItem)} style={{margin:"5px", float: "right", marginRight: "-40%"}}>Remove</Button>
                  </Col>
                </Row>
              )
              })
            }
          </Collection>
        }
        </Row>
      </Card>
    )
  }
}

class ResultsTable extends React.Component {
  constructor(props) {
    console.log("props")
    console.log(props)

    super(props)
    this.compare = this.compare.bind(this)
  }

  compare(secondUrl) {
    console.log('here in compare')
    setTimeout(() => {
      $("iframe").width("50%")
      $("iframe").css({'float': 'left'})

      // will be src = secondUrl
      var node = $("<iframe class='fancybox-iframe' src='" + secondUrl + "' style='width: 50%; float: right'>")
      $(".fancybox-content").append(node)
    }, 1000)
  }
  // // need to have unsw course and this course - unsw courses as tabs
  // need course unsw name few spaces and then course other name
  render() {
    console.log("this.props.data.length: " + this.props.data.length)
    return (
      <div id="results-table">
      { this.props.data.length > 0 &&
        <div>
        <p id="note-for-user-results-table">Please note that only universities with matches will be shown below</p>
        <h3>MATCHES</h3>
        <Collapsible>
        {
          this.props.data.map((result) => {
            return (
              <CollapsibleItem header={result.university} id="university-result-header">
                { result.unsw_courses.length > 0 &&
                  result.unsw_courses.map(unswCourse => {
                    return (
                      <Collapsible>
                        <CollapsibleItem header={unswCourse.name}>
                        { unswCourse.courses.length > 0 ?
                        <Collapsible>
                          { unswCourse.courses.map((course) => {
                            return (
                              <CollapsibleItem header={ course.similarity_score + " - " + course.name } icon="expand_more">
                                <a data-fancybox data-type="iframe" data-src={ course.url } href="javascript:;" onClick={() => this.compare(course.url2) } className="compare-img">
                                  <img src="./static/imgs/scales.png" id="compare-img-actual-img" />
                                </a>
                                <p className="results-course-field">Emails:</p>
                                { course.emails.length > 0 ?
                                  <div>
                                  { course.emails.map(email => {
                                    return (
                                      <p>{email}</p>
                                    )})
                                  }
                                  </div> :
                                  <p>Not available</p>
                                }
                                <p className="results-course-field">Assessments:</p>
                                { course.assessments.length > 0 ?
                                  <div>
                                  { course.assessments.map(assessment => {
                                    return (
                                      <p>{assessment}</p>
                                    )})
                                  }
                                  </div> :
                                  <p>Not available</p>
                                }
                                <p className="results-course-field">Contact hours:</p>
                                { course.contact_hours.length > 0 ?
                                  <div>
                                  { course.contact_hours.map(contact_hour => {
                                    return (
                                      <p>{contact_hour}</p>
                                    )})
                                  }
                                  </div> :
                                  <p>Not available</p>
                                }
                                <Tabs className='tab-demo z-depth-1'>
                                  <Tab title="Course content">
                                    { course.course_content.length > 0 ?
                                      <div>
                                      { course.course_content.map(course_content => {
                                        return (
                                          <p>{course_content}</p>
                                        )})
                                      }
                                      </div> :
                                      <p>Not available</p>
                                    }
                                  </Tab>
                                  <Tab title="Course outcomes">
                                    { course.course_outcomes.length > 0 ?
                                      <div>
                                      { course.course_outcomes.map(course_outcome => {
                                        return (
                                          <p>{course_outcome}</p>
                                        )})
                                      }
                                      </div> :
                                      <p>Not available</p>
                                    }
                                  </Tab>
                                  <Tab title="Textbooks">
                                    { course.textbooks.length > 0 ?
                                      <div>
                                      { course.textbooks.map(textbook => {
                                        return (
                                          <p>{textbook}</p>
                                        )})
                                      }
                                      </div> :
                                      <p>Not available</p>
                                    }
                                  </Tab>
                                  <Tab title="Keywords">
                                    { course.keywords.length > 0 ?
                                      <div>
                                      { course.keywords.map(keyword => {
                                        return (
                                          <p>{keyword}</p>
                                        )})
                                      }
                                      </div> :
                                      <p>Not available</p>
                                    }
                                  </Tab>
                                </Tabs>
                              </CollapsibleItem>
                            )
                          })
                          }
                        </Collapsible>
                        : <p>No course matches</p>
                        }
                        </CollapsibleItem>
                      </Collapsible>
                    )
                  })
                }
              </CollapsibleItem>
            )
          })
        }
        </Collapsible>
        </div>
      }
      </div>
    )
  }
}
// https://mozilla.github.io/pdf.js/getting_started/
// <a data-fancybox data-type="iframe" data-src="https://mozilla.github.io/pdf.js/web/viewer.html" href="javascript:;">
  //    Sample PDF file
  // </a>
//                        <Button onClick={() => this.compare(course)}>Compare</Button>


class UniversitiesTable extends React.Component {
  constructor(props){
    super(props)
    var universitiesSelected = {}
    props.universities.forEach((university) => {
      if (university.isSelected == true) {
        universitiesSelected[university.name] = university
      }
    })
    this.state = {
      universities: props.universities,
      universitiesSelected: universitiesSelected,
      selectAll: false,
      universitiesFilter: '',
      countriesFilter: ''
    };
    this.toggleSelected = this.toggleSelected.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.handleUniversityFilterChange = this.handleUniversityFilterChange.bind(this)
    this.handleCountryFilterChange = this.handleCountryFilterChange.bind(this)
    this.filterByUniversity = this.filterByUniversity.bind(this)
    this.filterByCountry = this.filterByCountry.bind(this)
    this.mapOverPriorSelection = this.mapOverPriorSelection.bind(this)
  }

  toggleSelected(event) {
    console.log('handling is selected')
    var universities = this.state.universities
    var cur = universities.find((university) => {
      return university.name == event.target.id
    })
    cur.isSelected = (cur.isSelected == true) ? false : true
    // set universities selected
    var universitiesSelected = this.state.universitiesSelected
    if (cur.isSelected == true) {
      universitiesSelected[cur.name] = cur
    } else if (cur.name in universitiesSelected) {
      delete universitiesSelected[cur.name]
    }
    this.setState({
      universities: universities,
      universitiesSelected: universitiesSelected
    })
  }

  selectAll(event) {
    var selectVal = (this.state.selectAll == true) ? false : true
    var universities = this.state.universities.map((university) => {
      var uniNew = university
      uniNew.isSelected = selectVal
      return uniNew
    })
    var universitiesSelected = this.state.universitiesSelected
    if (selectVal == true) {
      universities.forEach((university) => {
        universitiesSelected[university.name] = university
      })
    } else {
      universities.forEach((university) => {
        if (university.name in universitiesSelected) {
          delete universitiesSelected[university.name]
        }
      })
    }

    this.setState({
      universities: universities,
      universitiesSelected: universitiesSelected,
      selectAll: selectVal
    })
  }

  mapOverPriorSelection(universities) {
    var universitiesWithPriorSelection = universities.map((university) => {
      if (university.name in this.state.universitiesSelected) {
        university.isSelected = true
      }
      return university
    })
    return universitiesWithPriorSelection
  }

  handleUniversityFilterChange(event) {
    var universitiesNext = this.filterByCountry(this.state.countriesFilter, this.props.universities)
    var universitiesNextNext = this.filterByUniversity(event.target.value, universitiesNext)
    var universitiesWithPriorSelection = this.mapOverPriorSelection(universitiesNextNext)
    this.setState({
      universities: universitiesWithPriorSelection,
      universitiesFilter: event.target.value,
    })
  }

  filterByUniversity(value, universities) {
    var universitiesNext = universities.filter((university) => {
      console.log('filtering universities')
      return university.name.includes(value.toUpperCase())
    })
    return universitiesNext
  }

  handleCountryFilterChange(event) {
    var universitiesNext = this.filterByUniversity(this.state.universitiesFilter, this.props.universities)
    var universitiesNextNext = this.filterByCountry(event.target.value, universitiesNext)
    var universitiesWithPriorSelection = this.mapOverPriorSelection(universitiesNextNext)
    this.setState({
      universities: universitiesWithPriorSelection,
      countriesFilter: event.target.value
    })
  }

  filterByCountry(value, universities) {
    var universitiesNext = universities.filter((university) => {
      console.log('filtering universities by countries')
      return university.country.includes(value.toUpperCase())
    })
    return universitiesNext
  }

  render() {
    console.log('rerendering table')
    return (
      <Table>
        <thead>
          <tr>
            <th><Input type="checkbox" label=" " onChange={this.selectAll} checked={this.state.selectAll} /></th>
            <th>
              <Input list="universities" value={this.state.universitiesFilter} onChange={this.handleUniversityFilterChange} label="University" id="universityFilter" />
              <datalist id="universities">
                { this.state.universities.map((universityFilter) => {
                  return <option value={universityFilter.name}/>
                }
                )}
              </datalist>
            </th>
            <th>
              <Input list="countries" value={this.state.countriesFilter} onChange={this.handleCountryFilterChange} label="Country" id="countryFilter" />
              <datalist id="countries">
                { this.props.countries.map((countryFilter) => {
                  return <option value={countryFilter}/>
                }
                )}
              </datalist>
            </th>
          </tr>
        </thead>
        <tbody>
          { this.state.universities.map((university) => {
            return (
              <tr>
                <td>
                  <Input type="checkbox" label=" " id={university.name} onChange={this.toggleSelected} checked={university.isSelected} />
                </td>
                <td>{university.name}</td>
                <td>{university.country}</td>
              </tr>
            )
          })}
          <input type="hidden" name="universitiesSelected" value={this.state.universitiesSelected} />
        </tbody>
      </Table>
    )
  }
}

export {
  Search, ResultsTable, UniversitiesTable
}
