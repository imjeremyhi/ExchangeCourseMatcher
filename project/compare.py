from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet


def break_phrases(list_to_break):
    broken_list = []

    for word in list_to_break:
        for word_token in word_tokenize(word):
            broken_list.append(word_token)
    print broken_list
    return broken_list

# usage: keyword_similarities = compare_keywords(uni1_keywords, uni2_keywords)
# That returns a list of values for similarity for each element in uni1_keywords.
# You can do an avg or whatever to get a aggregate value

def compare_keywords(list1, list2, sim_type="path"):

    # maximum similarity for each word in list1 with words in list2
    similarity_dict = {}

    for list1_word in break_phrases(list1):
        try:
            max_similarity = 0
            synsetlist1 = wordnet.synsets(list1_word.encode('utf-8', 'ignore'))
            if len(synsetlist1) == 0:
                continue

            for list2_word in break_phrases(list2):
                print list2_word.encode('utf-8', 'ignore')
                synsetlist2 = wordnet.synsets(list2_word.encode('utf-8', 'ignore'))
                #calc similarity
                if len(synsetlist2) == 0:
                    continue

                syn_sum = 0
                avg_similarity = 0

                for synset1 in synsetlist1:
                    synset1sum = 0
                    for synset2 in synsetlist2:
                        # print "similarity of: " + str(synset1) + " vs " + str(synset2)
                        if sim_type == "path":
                            sim = synset1.path_similarity(synset2)
                        elif sim_type == "lch":
                            sim = synset1.lch_similarity(synset2)
                        elif sim_type == "wup":
                            sim = synset1.wup_similarity(synset2)
                        # elif sim_type == "res":
                        #     sim = synset1.res_similarity(synset2)
                        # elif sim_type == "jcn":
                        #     sim = synset1.jcn_similarity(synset2)
                        # elif sim_type == "lin":
                        #     sim = synset1.lin_similarity(synset2)
                        #
                        if sim != None:
                            synset1sum += sim
                    synset1avg = synset1sum / len(synsetlist2)
                    syn_sum += synset1avg
                avg_similarity = syn_sum / len(synsetlist1)


                print list1_word.encode('utf-8', 'ignore') + " similarity to " + list2_word.encode('utf-8', 'ignore') + ": " + str(avg_similarity)
                if avg_similarity > max_similarity:
                    max_similarity = avg_similarity

            max_sim_obj = {}
            similarity_dict[list1_word] = max_similarity
            # similarity_list.append(max_sim_obj)
        except Exception as e:
            print "Exception: " + str(e)
            continue
    return similarity_dict
