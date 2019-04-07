package cn.janking.swsad.bean;

public class Questionnaire {

    /*用户数量*/
    //private static int count = 1000;
    /*问卷资料*/
    private int ques_id;
    private int publish_id;
    private int respondent_id;
    private String questions;
    private String results;


    public Questionnaire(){
         questions= "The question is not ready";
    }

    public void setQuesId(int id) {
        this.ques_id = id;
    }

    public void setPublishId(int id) {
        this.publish_id = id;
    }
    public void setQuestions(String questions) {
        this.questions = questions;
    }

    public void setResults(String results) {
        this.results = results;
    }

    public int getQuesId() {
        return ques_id;
    }

    public int getPublishId() { return publish_id; }

    public int getRespondentId() {
        return respondent_id;
    }

    public String getQuestions() { return questions; }

    public String getResults() {
        return results;
    }


}
