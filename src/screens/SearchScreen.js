import React, {useState,useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
    const [term,setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();

    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price;
        });
    };

    return (
        <View>
            <SearchBar 
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <Text>We have found {results.length} results</Text>
            <ResultsList
                title="Cost Effective"
                results={filterResultsByPrice('$')}
            />
            <ResultsList
                title="Bit Pricier"
                results={filterResultsByPrice('$$')}
            />
            <ResultsList
                title="Big Spender"
                results={filterResultsByPrice('$$$')}
            />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default SearchScreen; 