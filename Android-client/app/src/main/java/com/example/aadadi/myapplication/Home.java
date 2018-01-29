package com.example.aadadi.myapplication;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.text.Layout;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;

/*import io.socket.emitter.Emitter;
import io.socket.engineio.client.Socket;*/

public class Home extends AppCompatActivity {

    private TextView mTextMessage;
    private RelativeLayout homeLayout;
    private Button bSendButton;
    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    mTextMessage.setText(R.string.title_home);
                    return true;
                case R.id.navigation_dashboard:
                    mTextMessage.setText(R.string.title_dashboard);
                    return true;
                case R.id.navigation_notifications:
                    mTextMessage.setText(R.string.title_notifications);
                    return true;
            }
            return false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home);
        homeLayout = findViewById(R.id.homeLayout);

        bSendButton = findViewById(R.id.sendBtn);
        bSendButton.setOnClickListener(
                new Button.OnClickListener(){

                    @Override
                    public void onClick(View view) {

                        final Socket socket;
                        try {
                            final String TAG = "info";
                            socket = IO.socket("https://192.168.0.11:3002");
                            socket.connect();
                            Log.v(TAG, "sending message");
                            socket.send("Test message");
                        } catch (URISyntaxException e) {
                            e.printStackTrace();
                        }


/*                        try {
                            final String TAG = "info";
                            final Socket socket = new Socket("http://192.168.0.11:3002");
                            socket.on(Socket.EVENT_OPEN, new Emitter.Listener() {
                                @Override
                                public void call(Object... args) {
                                    socket.send("hi");
                                    socket.emit("bye");
                                    Log.v(TAG, "call: sending message");
                                    socket.close();
                                }
                            });
                            socket.open();

                        } catch (URISyntaxException e) {
                            e.printStackTrace();
                        }*/
                }
        });
        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
    }

}
