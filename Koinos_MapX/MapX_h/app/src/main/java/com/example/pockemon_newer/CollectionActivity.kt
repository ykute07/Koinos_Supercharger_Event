package com.example.pockemon_newer

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.android.volley.Request.Method.GET
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_collection.*
import org.json.JSONException
import org.json.JSONObject
import java.lang.reflect.Method
import java.util.HashMap

class CollectionActivity : AppCompatActivity() {
    private var pageNumber = 1
    private var list = mutableListOf<Data>()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_collection)

        list = mutableListOf()
        sendRequest()
        load_more_button.setOnClickListener {
            pageNumber += 1
            sendRequest()
        }
    }
    private fun getUrl(): String {

        return "https://testnet.mirrornode.hedera.com/api/v1/accounts/CIQLBV5CDV7J7C4VX7R52NX5GZTOQNX7LVJJKULBWGBTAL2VM3V5YBQ/nfts"
    }

    private fun extractJSON(response : String){

        val jsonObject = JSONObject(response)

        val results = jsonObject.getJSONArray("nfts")


        for (i in 0..9){

            val item = results.getJSONObject(i)
            val nftname = item.getString("token_id")

            val data = Data(nftname)
            list.add(data)

        }

        val adapter = CollectionAdapter(list)
        list_view.adapter = adapter

    }
    private fun sendRequest(){

        val url = getUrl()



        val stringRequest: StringRequest = object : StringRequest( Method.GET, url,
            Response.Listener { response ->




                try {
                    extractJSON(response)

                } catch (e: JSONException) {
                    e.printStackTrace()
                }
            },
            Response.ErrorListener { error ->
                Toast.makeText(baseContext, error.toString(), Toast.LENGTH_LONG).show()
            }) {

            override fun getHeaders() : Map<String,String> {
                val params: MutableMap<String, String> = HashMap()
                params["x-api-key"] = "6a4aW20314Ced601C6if4837i9eq04e8"

                return params
            }

        }
        val requestQueue = Volley.newRequestQueue(baseContext)
        requestQueue.add(stringRequest)
    }

}