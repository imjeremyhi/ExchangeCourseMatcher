from nltk.corpus import wordnet

def compare_keywords(self, list1, list2, sim_type="path"):

    # maximum similarity for each word in list1 with words in list2 
    similarity_list = []

    for list1_word in list1:
        max_similarity = 0
        synsetlist1 = wordnet.synsets(list1_word)
        if len(synsetlist1) == 0:
            continue

        for list2_word in list2:
            synsetlist2 = wordnet.synsets(list2_word)
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


            print list1_word + " similarity to " + list2_word + ": " + str(avg_similarity)
            if avg_similarity > max_similarity:
                max_similarity = avg_similarity

        max_sim_obj = {list1_word: max_similarity}
        similarity_list.append(max_sim_obj)
    return similarity_list
