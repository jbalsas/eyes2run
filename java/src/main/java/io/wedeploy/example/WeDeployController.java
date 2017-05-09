package io.wedeploy.example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import org.json.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@EnableAutoConfiguration
public class WeDeployController {

    public WeDeployController() {
        beep();
    }

    public static void main(String[] args) {
        SpringApplication.run(WeDeployController.class, args);
    }

    @RequestMapping("/")
    public ModelAndView hello() {
        return new ModelAndView("layout");
    }

    // HTTP GET request
    private void sendGet() throws Exception {
        URL url = new URL("http://data.eyes2run.wedeploy.me/intention");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
            new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }

        in.close();

        String intentions = response.toString();

        intentions = "{\"intentions\": " + intentions + "}";

        JSONObject obj = new JSONObject(intentions);

        JSONArray arr = obj.getJSONArray("intentions");

        List<JSONObject> blinds = new ArrayList();
        List<JSONObject> noBlinds = new ArrayList();

        for (int i = 0; i < arr.length(); i++) {
            JSONObject intention =  arr.getJSONObject(i);

            System.out.println("Intention " + intention + "Match " + intention.opt("match"));

            if (!intention.optBoolean("match")) {
                boolean isBlind = new Boolean(intention.optString("blind").trim());

                System.out.println("Intention " + intention + "Blind " + isBlind);
                if (isBlind) {
                    blinds.add(intention);
                }
                else {
                    noBlinds.add(intention);
                }
            }
        }

        if (noBlinds.isEmpty() || blinds.isEmpty())
            return;

        for (JSONObject blind : blinds) {
            JSONObject noBlind = noBlinds.remove(0);

            sendPost(blind, noBlind.optString("userId"));

            sendPost(noBlind, blind.optString("userId"));

            System.out.println("Blind " + blind + " No Blind" + noBlind);
        }
    }

    private void sendPost(String match1, String match2) throws Exception {

        String url = "http://data.eyes2run.wedeploy.me/intention;
        URL obj = new URL(url);
        HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

        //add reuqest header
        con.setRequestMethod("POST");
        String urlParameters = "match1=" + match1 + "&match2="+ match2;

        // Send post request
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(urlParameters);
        wr.flush();
        wr.close();

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Post parameters : " + urlParameters);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
            new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //print result
        System.out.println(response.toString());

    }

    public void beep() {
        final Runnable beeper = new Runnable() {
            public void run() {
                System.out.println("beep");

                try {
                    sendGet();
                }
                catch (Exception e) {
                    e.printStackTrace();
                }
            }

        };
        final ScheduledFuture<?> scheduledFuture =
            scheduler.scheduleAtFixedRate(beeper, 0, 1, TimeUnit.SECONDS);

        scheduler.schedule(
            new Runnable() {
                public void run() {
                    scheduledFuture.cancel(true);
                }
        }, 60 * 60, TimeUnit.SECONDS);
    }

    private final ScheduledExecutorService scheduler =
        Executors.newScheduledThreadPool(1);

}