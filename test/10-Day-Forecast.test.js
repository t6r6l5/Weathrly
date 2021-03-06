import React from 'react';
import { shallow, mount } from 'enzyme';
import TenDayForecast from '../lib/10-Day-Forecast';
import cleanData from '../lib/cleanData';
import apiData from '../staticAPIdata';

let testData = cleanData(apiData);


describe('10 Day' , () => {
  it('should exist', () => {
    const wrapper = shallow(<TenDayForecast tenDay= {testData.tenDayObject} />);
    expect(wrapper).toBeDefined();
  });

  it ('Should initialize 10 card components', () => {
    const wrapper = mount(<TenDayForecast tenDay= {testData.tenDayObject} />);
    expect(wrapper.find('.Card').length).toEqual(10);
  });

  it ('Should receive expected number of props', () => {
    const wrapper = mount(<TenDayForecast tenDay= {testData.tenDayObject} />);
    expect(Object.keys(wrapper.props().tenDay[0]).length).toEqual(13);
  });

  it ('Should receive "Partly Cloudy" as the prop for condition', () => {
    const wrapper = mount(<TenDayForecast tenDay= {testData.tenDayObject} />);
    expect(wrapper.props().tenDay[0].condition).toEqual('Partly Cloudy');
  });

  it ('Should receive "SSE" as the prop for condition windCondition', () => {
    const wrapper = mount(<TenDayForecast tenDay= {testData.tenDayObject} />);
    expect(wrapper.props().tenDay[0].windDirection).toEqual('SSE');
  });

  it ('The first card component should have a day of Tuesday', () => {
    const wrapper = mount(<TenDayForecast tenDay= {testData.tenDayObject} />)
    expect(wrapper.find('.Card').find('h1').slice(0,1).text()).toEqual('Tuesday ');
  });

  it ('The last card component should have a day of Sunday', () => {
    const wrapper = mount(<TenDayForecast tenDay= {testData.tenDayObject} />)
    expect(wrapper.find('.Card').find('h1').slice(5,6).text()).toEqual('Sunday ');
  });

  it ('The first card component should have a low of 43 degrees', () => {
    const wrapper = mount(<TenDayForecast tenDay= {testData.tenDayObject} />);
    expect(wrapper.find('.Card').slice(0,1).find('div').slice(4,5).text()).toEqual(' 54˚  43˚ ');
  });

  it ('The last card component should have a low of 41 degrees', () => {
    const wrapper = mount(<TenDayForecast tenDay= {testData.tenDayObject} />);
    expect(wrapper.find('.Card').slice(5,6).find('div').slice(4,5).text()).toEqual(' 68˚  41˚ ');
  });
  
})